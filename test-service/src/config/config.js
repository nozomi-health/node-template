/* eslint-disable global-require */
const path = require('path');

const {getEnvVariable} = require('../../../shared/utils/config');

if (process.env.MODE !== 'production') {
  require('dotenv').config({path: path.join(__dirname, '../../.env')});
} else {
  require('../../env');
}

const config = {
  port: getEnvVariable('PORT', {defaultValue: 8081}),
  db: {
    connectionString: getEnvVariable('DB_CONNECTION_STRING', {isRequired: true}),
  },
};

module.exports = config;
