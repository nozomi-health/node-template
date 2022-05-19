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
  ],
};
