const path = require('path');

const {getEnvVariable} = require('@node-template/shared/utils/config');

require('dotenv').config({
  path: path.join(__dirname, process.env.MODE ? `../../.env.${process.env.MODE}` : '../../.env'),
});

const config = {
  port: getEnvVariable('PORT', {defaultValue: 8082}),
  apiKey: getEnvVariable('API_KEY', {isRequired: true}),
};

module.exports = config;
