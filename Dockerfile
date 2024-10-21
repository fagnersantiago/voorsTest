# Use uma imagem base leve
FROM node:18-alpine


WORKDIR /app


COPY package.json yarn.lock ./


RUN yarn cache clean && yarn install


COPY . .


EXPOSE 3333

CMD ["yarn", "start"]
