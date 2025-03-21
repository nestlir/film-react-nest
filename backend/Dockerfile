FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./

# Нужно ставить все зависимости, включая dev, на этапе сборки
RUN npm install

COPY . .

# Теперь nest доступен
RUN npm run build

# Этап для production-запуска
FROM node:20-alpine

WORKDIR /app

# Устанавливаем только продакшен зависимости на финальном этапе
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Копируем только готовый билд с предыдущего этапа
COPY --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]
