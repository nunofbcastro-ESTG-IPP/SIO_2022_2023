FROM node:19-alpine

USER root

EXPOSE 80

WORKDIR /frontend

RUN apk add --no-cache bash
RUN apk add --no-cache git

RUN npm install -g pnpm