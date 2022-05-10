module.exports = {
  apps: [
    {
      name: 'test-ms',
      script: './test-service/src/main.js',
      watch: './test-service',
      env: {
        MODE: 'development',
      },
      env_production: {
        MODE: 'production',
      },
    },
    {
      name: 'integration-test-ms',
      script: './integration-test-service/src/main.js',
      watch: './integration-test-service',
      env: {
        MODE: 'development',
      },
      env_production: {
        MODE: 'production',
      },
    },
  ],
};
