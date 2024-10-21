FROM node:18

WORKDIR /usr/app

COPY package.json ./

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 3333

CMD ["yarn", "run", "dev"]
