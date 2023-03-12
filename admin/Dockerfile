# Node Version with name "develop" environment
FROM node:18.15 AS develop

WORKDIR /admin/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@15.2.2

COPY . .

RUN npm install start
