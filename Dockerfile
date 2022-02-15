FROM node:16

ENV NODE_ENV=production

WORKDIR /app
COPY . .

RUN ["yarn"]

CMD ["/bin/sh","-c", "yarn run deploy && yarn run start"]
