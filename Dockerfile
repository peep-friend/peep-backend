# build stage
FROM node:18-alpine AS build

RUN npm i -g pnpm
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# prod stage
FROM node:18-alpine

WORKDIR /usr/src/app

# Set environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Copy built files from the previous stage
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./

# Install production dependencies only
RUN npm i -g pnpm
RUN pnpm install --only=production

# Remove development dependencies
RUN rm package*.json

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/main.js"]
