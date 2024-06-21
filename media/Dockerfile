FROM node:18-alpine

WORKDIR /app

ENV PORT=3002
ENV HOSTNAME='0.0.0.0'
ENV MONGODB_CONNECTION_STRING=mongodb://mongodb:27017/realme

COPY package.json ./
COPY yarn.lock ./
COPY ./node_modules ./node_modules
COPY ./build ./build

# Install ffmpeg
RUN apk update && apk add --no-cache ffmpeg
 
EXPOSE 3002

CMD [ "yarn", "start" ]