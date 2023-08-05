# Node Version with name "develop" environment
FROM node:18.15 AS develop

WORKDIR /admin/src/app

RUN npm install -g @angular/cli@16.1.0

COPY package*.json ./

RUN npm install

COPY . .
