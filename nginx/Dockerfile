FROM nginx:alpine

# Копируем только конфигурацию сайта без events/http
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Стандартный nginx.conf уже корректен в образе nginx:alpine, поэтому его не копируем!
