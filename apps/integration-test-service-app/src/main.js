const express = require('express');
const cors = require('cors');

const errorMiddleware = require('@node-template/shared/middleware/errorMiddleware');

const config = require('./config/config');

const StuffController = require('./modules/stuff/stuff.controller');

const expressApp = express();

const startServer = (app) => {
  app.use(cors());
  app.use(express.json());

  const service = {};

  const rootRouter = express.Router();

  rootRouter.use('/stuff', new StuffController(service).getRouter());

  app.use('/v1', rootRouter);
  app.use(errorMiddleware);

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on port ${config.port}`);
  });
};

startServer(expressApp);
