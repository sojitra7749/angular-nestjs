# Node Version with name "develop" environment
FROM node:18.15 AS develop

WORKDIR /admin/src/app

RUN npm install -g @angular/cli@15.2.2

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install start
