# Node Version with name "develop" environment
FROM node:18.15 AS develop

# Working directory inside container
WORKDIR /src/app

# Copy package-lock.json & package.json to docker container
COPY package*.json ./

# Install node modules
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

# Node Version with name "prod" environment
FROM node:18.15 AS prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set work dir
WORKDIR /src/app

COPY --from=develop /src/app/ .

EXPOSE 3000

# run app
CMD [ "node", "dist/main"]
