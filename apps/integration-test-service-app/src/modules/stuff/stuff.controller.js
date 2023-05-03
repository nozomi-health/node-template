const ApiError = require('@node-template/shared/exceptions/ApiError');
const BaseController = require('@node-template/shared/classes/BaseController');

/* eslint-disable class-methods-use-this */
const config = require('../../config/config');

class UserController extends BaseController {
  constructor(service) {
    super(service);

    this.getAll = this.getAll.bind(this);
    this.apiKeyMiddleware = this.apiKeyMiddleware.bind(this);

    this.router.get(
      '/',
      this.apiKeyMiddleware,
      this.getAll,
    );
  }

  apiKeyMiddleware(req, __res, next) {
    if (!req.headers['api-key'] || req.headers['api-key'] !== config.apiKey) {
      return next(ApiError.UnauthorizedError());
    }

    return next();
  }

  getAll(__req, res, next) {
    try {
      return res.status(200).json([
        {
          name: 'firstStuff',
          value: 'firstStuffValue',
        },
        {
          name: 'secondStuff',
          value: 'secondStuffValue',
        },
      ]);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = UserController;
