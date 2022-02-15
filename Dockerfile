FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn run deploy

CMD ["/bin/sh","-c", "yarn run start"]
