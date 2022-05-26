const {Pool} = require('pg');
const express = require('express');
const cors = require('cors');

const config = require('./config/config');
const errorMiddleware = require('../../shared/middleware/errorMiddleware');

const UserRepository = require('./modules/user/user.repository');

const UserService = require('./modules/user/user.service');

const UserController = require('./modules/user/user.controller');

const expressApp = express();

const createDatabaseClient = () => {
  const pool = new Pool({
    connectionString: config.db.connectionString,
    max: 20,
  });

  return pool;
};

const startServer = (app) => {
  const dbClient = createDatabaseClient();

  app.use(cors());
  app.use(express.json());

  const repository = {
    user: new UserRepository(dbClient),
  };

  const service = {
    user: new UserService(repository),
  };

  const rootRouter = express.Router();

  rootRouter.use('/users', new UserController(service).getRouter());

  app.use('/v1', rootRouter);
  app.use(errorMiddleware);

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on port ${config.port}`);
  });
};

startServer(expressApp);
