# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=16.20.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Copy .env file for backend
COPY --link backend/.env .env

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python 

# Install node modules for backend
COPY --link package-lock.json package.json ./backend/
RUN npm install --prefix ./backend

# Copy backend application code
COPY --link backend ./backend

# Build the backend (if you have a build step, if not, remove this)
# RUN npm run build --prefix backend

# Final stage for app image
FROM base as backend

# Copy built backend application
COPY --from=build /app/backend /app/backend

# Start the backend server by default, this can be overwritten at runtime
EXPOSE 1997
CMD ["node", "backend/server.js"]

# Throw-away build stage for frontend
FROM base as frontend-build

# Install node modules for frontend
WORKDIR /app/client
COPY --link client/package-lock.json client/package.json ./
RUN npm ci

# Copy frontend application code
COPY --link client .

# Build the frontend
RUN npm run build

# Final stage for frontend image
FROM nginx:alpine as frontend

# Copy built frontend application
COPY --from=frontend-build /app/client/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
