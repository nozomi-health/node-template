const {Pool} = require('pg');

const createDatabaseClient = ({connectionString}) => {
  const pool = new Pool({
    connectionString,
    max: 20,
  });

  return pool;
};

module.exports = {
  createDatabaseClient,
};
