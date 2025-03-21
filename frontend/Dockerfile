FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Объявляешь аргументы сборки с дефолтными значениями
ARG VITE_API_URL=/api/afisha
ARG VITE_CDN_URL=/content/afisha

# Теперь можешь задать переменные окружения во время сборки
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}

# Сборка приложения
RUN npm run build
