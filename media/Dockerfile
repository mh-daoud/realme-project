FROM node:18-alpine

WORKDIR /app

ENV PORT=3002
ENV HOSTNAME='0.0.0.0'

COPY package.json ./
COPY yarn.lock ./
COPY ./node_modules ./node_modules
COPY ./build ./build

EXPOSE 3002

CMD [ "yarn", "start" ]