# B1: cài môi trường Node
FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]