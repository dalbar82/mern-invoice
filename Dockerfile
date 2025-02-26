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
# Backend Build Stage
# --------------------------------
FROM base as build

# Install dependencies required for building native modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python 

# Copy backend package files
WORKDIR /app/backend
COPY --link backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy backend application code
COPY --link backend ./

# Uncomment if you need to build TypeScript or other assets
# RUN npm run build

# --------------------------------
# Backend Final Stage
# --------------------------------
FROM base as backend

# Copy built backend application and node_modules
WORKDIR /app/backend
COPY --from=build /app/backend /app/backend
COPY --from=build /app/backend/node_modules /app/backend/node_modules

# Expose backend port
EXPOSE 1997

# Start the backend server
CMD ["node", "server.js"]

# --------------------------------
# Frontend Build Stage
# --------------------------------
FROM base as frontend-build

# Set working directory for frontend
WORKDIR /app/client

# Copy frontend package files
COPY --link client/package.json client/package-lock.json ./

# Install frontend dependencies
RUN npm install --legacy-peer-deps


# Copy frontend application code
COPY --link client ./

# Build the frontend
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
