const path = require('path');

const {getEnvVariable} = require('@node-template/shared/utils/config');

require('dotenv').config({
  path: path.join(__dirname, process.env.MODE ? `../.env.${process.env.MODE}` : '../.env'),
});

const getConnectionString = ({
  username,
  password,
  host,
  port,
  databaseName,
}) => `postgresql://${username}:${password}@${host}:${port}/${databaseName}`;

const getConnectionStringFromEnv = () => getConnectionString({
  username: getEnvVariable('DB_USERNAME', {isRequired: true}),
  password: getEnvVariable('DB_PASSWORD', {isRequired: true}),
  host: getEnvVariable('DB_HOST', {isRequired: true}),
  port: getEnvVariable('DB_PORT', {isRequired: true}),
  databaseName: getEnvVariable('DB_NAME', {isRequired: true}),
});

module.exports = {
  getConnectionString,
  getConnectionStringFromEnv,
};
