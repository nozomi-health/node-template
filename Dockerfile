FROM keymetrics/pm2:latest-alpine
FROM node:16-alpine

# Bundle APP files
COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn install

# Show current folder structure in logs
RUN ls -al -R

CMD [ "npx", "pm2-runtime", "start", "ecosystem.config.js" ]
