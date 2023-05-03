const path = require('path');
const pg = require('pg');
const {migrate} = require('postgres-migrations');

const {getConnectionStringFromEnv} = require('./utils/connectionString');

const runMigration = async () => {
  // Note: when passing a client, it is assumed that the database already exists
  const client = new pg.Client({connectionString: getConnectionStringFromEnv()});
  await client.connect();

  try {
    await migrate({client}, path.join(__dirname, './migrations'));
  } finally {
    await client.end();
  }
};

runMigration();
