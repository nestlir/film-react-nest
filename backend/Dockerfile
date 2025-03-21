FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"] 