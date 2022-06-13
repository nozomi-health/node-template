# node-template

Use this project as a base for any node projects. Follow existing project structure, example files logic and principles while extending it.

## Preconditions

Docker desktop must be installed to run database inside the container

## Install and run

* Development
```
yarn install
yarn db:start
yarn db:migrate
yarn start:dev
```

* Production
```
yarn install
yarn db:start:prod
yarn db:migrate:prod
yarn start:prod
```

To log outputs use ```npx pm2 logs```

## Rules

* Add new migrations to ./db/migrations directory
* Add local environment variables to .env files in db, docker and any of your service directories
* When creating a new service you must:
  * Add it’s name to root’s package.json 'workspaces' section (so dependencies are shared among services)
  * Add a new object (corresponding to this service) in ecosystem.config file with both development and production env variables provided
* Each new service must have .env and env.prod files for storing development and production environment variables

## Nginx configuration

You are able to add/edit nginx configurations for your services in ./nginx/nginx.conf file. **ONLY** 'Editable area' is allowed to be edited.

![](https://user-images.githubusercontent.com/36966618/173400736-61ac3a39-7f8c-4d3c-92ed-b74b5b1695dc.jpg)

## Husky setup

After installing dependencies run 
```
yarn husky install && echo 'PATH=$PATH:'$PATH >> .husky/_/husky.sh
```
## CI/CD Slack integration
To enable slack notifications on automatic deployments, please, follow the instructions in corresponding section of ./.github/workflows/deploy.yml file
