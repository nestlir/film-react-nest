# Используем Node.js
FROM node:20-alpine AS builder
WORKDIR /app

# Устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем код и билдим
COPY . .
RUN npm run build

# Этап 2: Запуск продакшн-версии
FROM node:20-alpine
WORKDIR /app

# Копируем собранный код и зависимости
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Устанавливаем переменные окружения
ENV NODE_ENV=production

# Открываем порт
EXPOSE 3000

# Запускаем сервер
CMD ["node", "dist/main.js"]
