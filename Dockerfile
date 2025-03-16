# Use a newer Node.js version for compatibility
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Set working directory for the app
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Copy .env file for backend
COPY --link backend/.env .env

# --------------------------------
# Backend Build Stage (with TypeScript)
# --------------------------------
FROM base as build

# Install dependencies required for building native modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python 

# Copy backend package files
WORKDIR /app/backend
COPY --link backend/package.json backend/package-lock.json ./

# Install dependencies including TypeScript
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy backend application code
COPY --link backend ./

# Compile TypeScript (Outputs to `/app/backend/dist`)
RUN npm run build

# --------------------------------
# Backend Final Stage
# --------------------------------
FROM base as backend

# Copy built backend application and node_modules
WORKDIR /app/backend
COPY --from=build /app/backend/dist /app/backend/dist
COPY --from=build /app/backend/node_modules /app/backend/node_modules

# Expose backend port
EXPOSE 1997

# Start the backend server
CMD ["node", "dist/server.js"]  # Run compiled TypeScript file

# --------------------------------
# Frontend Build Stage (with TypeScript)
# --------------------------------
FROM base as frontend-build

# Set working directory for frontend
WORKDIR /app/client

# Copy frontend package files
COPY --link client/package.json client/package-lock.json ./

# Install frontend dependencies
RUN npm install --legacy-peer-deps

# Install TypeScript for frontend
RUN npm install -g typescript

# Copy frontend application code
COPY --link client ./

# Compile TypeScript (Outputs to `/app/client/build`)
RUN npm run build

# --------------------------------
# Frontend Final Stage
# --------------------------------
FROM nginx:alpine as frontend

# Copy built frontend application to Nginx directory
COPY --from=frontend-build /app/client/build /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
