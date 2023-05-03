# node-template

Use this project as a base for any node projects. Follow existing project structure, example files logic and principles while extending it.
For more detailed info check [Notion page](https://www.notion.so/NodeJS-project-initialisation-240db20ef0e34208b1360b9a5b0c18e3)

## Preconditions

Docker desktop must be installed to run database and microservices inside the containers

## Install and run

* Development

  - PM2

    To install dependencies run
    ```
    yarn
    ```

    To start database and apply migrations run
    ```
    yarn db:start:dev
    yarn db:migrate:dev
    ```

    To start services run
    ```
    yarn start:dev
    ```
    To log pm2 outputs use ```npx pm2 logs```

  - Docker

    To start db and services in docker run
    ```
    yarn docker-up:dev
    yarn
    yarn db:migrate:dev
    ```

* Remote environments

  To start db and services in docker run
  ```
  yarn docker-up:staging
  yarn docker-up:prod
  ```

## Rules

* When creating a new service you must:
  * Add a new object (corresponding to this service) in ecosystem.config file
  * Add service section in docker-compose.yml file
* Each new service must have .env, .env.staging, .env.production files for storing development, staging and production environment variables
* Add new migrations to ./packages/db/migrations directory
* All database configuration is stored in ./packages/db environment files(for dev we retrieve all environment variables from .env file and for other environments most part of variables comes from secret manager)
* If you run services with PM2 DB_HOST should be server ip address or localhost and DB_PORT is external postgres container port.
* If you run services with Docker DB_HOST should be postgres container name and DB_PORT - internal postgres container port

## Nginx configuration

You are able to add/edit nginx configurations for your services in ./nginx/nginx.conf file. **ONLY** 'Editable area' is allowed to be edited.

![](https://user-images.githubusercontent.com/36966618/173400736-61ac3a39-7f8c-4d3c-92ed-b74b5b1695dc.jpg)

## CI/CD Slack integration
To enable slack notifications on automatic deployments, please, follow the instructions in corresponding section of ./.github/workflows/deploy.yml file
