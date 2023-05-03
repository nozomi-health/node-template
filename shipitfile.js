/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const {apps} = require('./ecosystem.config');

const config = {
  deployerUsername: process.env.DEPLOYER_USERNAME,
  appPublicIpAddress: process.env.PUBLIC_IP_ADDRESS,
  githubRepoUrl: process.env.GITHUB_REPO_URL,
  domain: process.env.DOMAIN,
};

const appNames = apps.map((app) => app.name);

module.exports = (shipit) => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      deployTo: '/opt/nozomi/test-ws', // add your name
      repositoryUrl: config.githubRepoUrl,
      keepReleases: 3,
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
  });

  shipit.blTask('npm-install', async () => {
    shipit.remote(`cd ${shipit.releasePath} && yarn install`);
  });

  shipit.blTask('copy-config', async () => {
    await shipit.remote(`mkdir -p ${shipit.config.deployTo}/shared`);
    await shipit.copyToRemote('ecosystem.config.js', ecosystemFilePath);
  });

  shipit.blTask('pm2-server', async () => {
    await shipit.remote(`cd ${shipit.releasePath} && pm2 delete -s ${appNames.join(' ')} || :`);
    await shipit.remote(
      `cd ${shipit.releasePath} && pm2 start ${ecosystemFilePath} --env production`,
    );

    await shipit.remote(`cd ${shipit.releasePath}/db && bash ./scripts/startup.sh testpostgresql`); // add your container name
    await shipit.remote(`cd ${shipit.releasePath} && yarn db:migrate:prod`);

    await shipit.remote(`DOMAIN=${config.domain} node ${shipit.releasePath}/nginx/nginx.js > /etc/nginx/sites-available/${config.domain}`);
    await shipit.remote('systemctl restart nginx');
  });
};
