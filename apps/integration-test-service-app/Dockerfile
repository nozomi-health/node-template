FROM node:18-alpine as base

WORKDIR /app
EXPOSE 8082

ARG TARGET
ENV TARGET $TARGET

FROM base as build

COPY /package.json ./
COPY /yarn.lock ./
COPY /.husky ./.husky
COPY /scripts ./scripts
COPY /packages ./packages

COPY /apps/integration-test-service-app/src ./apps/integration-test-service-app/src
COPY /apps/integration-test-service-app/package.json ./apps/integration-test-service-app/
COPY /apps/integration-test-service-app/*env* ./apps/integration-test-service-app/

RUN chmod +x scripts/installDependencies.sh && sh scripts/installDependencies.sh

WORKDIR /app/apps/integration-test-service-app

CMD yarn start:$TARGET
