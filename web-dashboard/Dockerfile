# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./

# NEW: Use BuildKit cache here as well
RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .
RUN npx nx build web-dashboard

# Stage 2: Serve via Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/web-dashboard /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
