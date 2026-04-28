# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./

# NEW: Use BuildKit cache to speed up npm installs
RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .
RUN npx nx build telemetry-gateway 

# Stage 2: Production
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist/telemetry-gateway ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main.js"]
