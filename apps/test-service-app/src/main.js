const express = require('express');
const cors = require('cors');

const errorMiddleware = require('@node-template/shared/middleware/errorMiddleware');
const {createDatabaseClient} = require('@node-template/db/utils/databaseClient');
const {getConnectionStringFromEnv} = require('@node-template/db/utils/connectionString');

const config = require('./config/config');

const UserRepository = require('./modules/user/user.repository');

const UserService = require('./modules/user/user.service');

const UserController = require('./modules/user/user.controller');

const expressApp = express();

const startServer = (app) => {
  const dbClient = createDatabaseClient({connectionString: getConnectionStringFromEnv()});

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
