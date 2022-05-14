/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const config = {
  deployerUsername: process.env.DEPLOYER_USERNAME,
  appPublicIpAddress: process.env.PUBLIC_IP_ADDRESS,
  githubRepoUrl: process.env.GITHUB_REPO_URL,
  domain: process.env.DOMAIN,
};

module.exports = (shipit) => {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  const appName = 'node-test-server';

  shipit.initConfig({
    default: {
      deployTo: `/opt/nozomihealth/test-service`,
      repositoryUrl: config.githubRepoUrl,
      keepReleases: 3,
      shared: {
        overwrite: true,
        dirs: ['node_modules'],
      },
    },
    production: {
      servers: `${config.deployerUsername}@${config.appPublicIpAddress}`,
      branch: 'master',
    },
  });

  const ecosystemFilePath = path.join(
    shipit.config.deployTo,
    'shared',
    'ecosystem.config.js',
  );

  shipit.on('updated', async () => {
    shipit.start('npm-install', 'copy-config');
  });

  shipit.on('published', async () => {
    shipit.start('pm2-server');
    shipit.start('nginx-config');
  });

  shipit.blTask('npm-install', async () => {
    shipit.remote(`cd ${shipit.releasePath} && yarn install --production`);
  });

  shipit.blTask('copy-config', async () => {
    await shipit.copyToRemote('ecosystem.config.js', ecosystemFilePath);
  });

  shipit.blTask('pm2-server', async () => {
    await shipit.remote(`cd ${shipit.releasePath} && npx pm2 delete -s ${appName} || :`);
    await shipit.remote(
      `cd ${shipit.releasePath} && npx pm2 start ${ecosystemFilePath} --env production --watch true`,
    );
  });

  shipit.blTask('nginx-config', async () => {
    await shipit.remote(`DOMAIN=${config.domain} node ${shipit.releasePath}/nginx/nginx.js > /etc/nginx/sites-available/${config.domain}`);
    await shipit.remote('systemctl restart nginx');

    await shipit.remote(`docker-compose down && cd ${shipit.releasePath} && yarn db:start && yarn db:migrate`);
  });
};
