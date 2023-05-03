const path = require('path');

const { getEnvVariable } = require('@node-template/shared/utils/config');

require('dotenv').config({
  path: path.join(__dirname, process.env.MODE ? `../../.env.${process.env.MODE}` : '../../.env'),
});

const config = {
  port: getEnvVariable('PORT', { defaultValue: 8081 }),
  integration: {
    integrationApiKey: getEnvVariable('INTEGRATION_API_KEY', { isRequired: true }),
    integrationUrl: getEnvVariable('INTEGRATION_URL', { isRequired: true }),
  },
};

module.exports = config;
