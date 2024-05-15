FROM node:18-slim

WORKDIR /crud
COPY package*.json ./
COPY nodemon.json ./nodemon.json
COPY .env ./.env
COPY tsconfig.json ./
COPY . ./
RUN yarn install
CMD ["yarn", "start" ]