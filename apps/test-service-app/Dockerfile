FROM node:18-alpine as base

WORKDIR /app
EXPOSE 8081

ARG TARGET
ENV TARGET $TARGET

FROM base as build

COPY /package.json ./
COPY /yarn.lock ./
COPY /.husky ./.husky
COPY /scripts ./scripts
COPY /packages ./packages

COPY /apps/test-service-app/src ./apps/test-service-app/src
COPY /apps/test-service-app/package.json ./apps/test-service-app/
COPY /apps/test-service-app/*env* ./apps/test-service-app/

RUN chmod +x scripts/installDependencies.sh && sh scripts/installDependencies.sh

WORKDIR /app/apps/test-service-app

CMD yarn start:$TARGET
