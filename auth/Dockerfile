FROM node:18-alpine

WORKDIR /app

ENV PORT=3000
ENV HOSTNAME='0.0.0.0'
ENV MONGODB_CONNECTION_STRING=mongodb://127.0.0.1:27018/realme

COPY package.json ./
COPY yarn.lock ./
COPY ./node_modules ./node_modules
COPY ./build ./build

EXPOSE 3000

CMD [ "yarn", "start" ]