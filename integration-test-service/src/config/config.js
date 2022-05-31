/* eslint-disable global-require */
const path = require('path');

const {getEnvVariable} = require('../../../shared/utils/config');

require('dotenv').config({
  path: path.join(__dirname, process.env.MODE !== 'production'
    ? '../../.env'
    : '../../env.prod'),
});

const config = {
  port: getEnvVariable('PORT', {defaultValue: 8082}),
  apiKey: getEnvVariable('API_KEY', {isRequired: true}),
};

module.exports = config;
