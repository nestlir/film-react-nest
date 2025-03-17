# Этап 1: Сборка фронтенда
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Этап 2: Копируем сборку в volume (будет использоваться Nginx)
FROM alpine
WORKDIR /var/www/frontend
COPY --from=builder /app/dist /var/www/frontend
CMD ["echo", "Frontend built and copied to volume"]
