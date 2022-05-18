require('../../env');
const {getEnvVariable} = require('../../../shared/utils/config');

const config = {
  port: getEnvVariable('PORT', {defaultValue: 8081}),
  db: {
    connectionString: getEnvVariable('DB_CONNECTION_STRING', {isRequired: true}),
  },
};

module.exports = config;
