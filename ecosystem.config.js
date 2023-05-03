module.exports = {
  apps: [
    {
      name: 'test-service-app',
      script: './apps/test-service-app/src/main.js',
      watch: './apps/test-service-app',
    },
    {
      name: 'integration-test-service-app',
      script: './apps/integration-test-service-app/src/main.js',
      watch: './apps/integration-test-service-app',
    },
  ],
};
