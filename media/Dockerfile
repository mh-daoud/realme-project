#Base Image
FROM node:18-alpine

#Speicify port
ENV PORT=3000
ENV HOSTNAME='0.0.0.0'

#Set working directory
WORKDIR /app

#Coy files to working directory
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY ./src ./src

#Install dependecnies 
RUN yarn install \
    && yarn build 

EXPOSE 3000

CMD [ "yarn", "start"]
