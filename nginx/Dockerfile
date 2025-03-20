# Используем базовый образ NGINX Alpine
FROM nginx:alpine

# Копируем наш конфигурационный файл NGINX в контейнер
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80 для веб-трафика
EXPOSE 80

# Запускаем NGINX в режиме демона при старте контейнера
CMD ["nginx", "-g", "daemon off;"]
