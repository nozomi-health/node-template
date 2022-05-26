const {query} = require('express-validator');

const BaseController = require('../../../../shared/classes/BaseController');
const validationSchemas = require('../../validators/schemas');
const validate = require('../../../../shared/middleware/validationMiddleware');
const ApiError = require('../../../../shared/exceptions/ApiError');
const paramIdValidator = require('../../../../shared/validators/paramId');

class UserController extends BaseController {
  constructor(service) {
    super(service);

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.router.get(
      '/',
      validate([
        query('nameLength').optional().isNumeric().withMessage('nameLength must be numeric'),
        query('email').optional().isEmail().withMessage('Invalid email'),
        query('populateStuff').optional().isBoolean().withMessage('populateStuff must be boolean'),
      ]),
      (req, __res, next) => {
        req.query.populateStuff = req.query.populateStuff === 'true';

        return next();
      },
      this.getAll,
    );

    this.router.get(
      '/:id',
      validate([paramIdValidator('id')]),
      this.getById,
    );

    this.router.delete(
      '/:id',
      validate([paramIdValidator('id')]),
      this.delete,
    );

    this.router.post(
      '/',
      validate([
        validationSchemas.user,
      ]),
      this.create,
    );

    this.router.put(
      '/:id',
      validate([paramIdValidator('id')]),
      (req, __res, next) => {
        if (req.params.id !== req.body.id) {
          return next(ApiError.BadRequest());
        }

        return next();
      },
      validate([
        validationSchemas.user,
      ]),
      this.update,
    );
  }

  async getAll(req, res, next) {
    try {
      const {populateStuff} = req.query;
      const emailFilter = req.query.email;
      if (emailFilter) {
        const emailFilteredUser = await this.service.user
          .findUserByEmail(emailFilter, populateStuff);

        return res.status(200).json(emailFilteredUser);
      }

      const nameLengthFilter = req.query.nameLength;
      if (nameLengthFilter) {
        const nameLengthFilteredUsers = await this.service.user
          .findUsersByNameLength(nameLengthFilter, populateStuff);

        return res.status(200).json(nameLengthFilteredUsers);
      }

      const users = await this.service.user.findAllUsers(populateStuff);
      return res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  }

  async getById(req, res, next) {
    const {id} = req.params;

    try {
      const user = await this.service.user.findUserById(id);
      if (!user) {
        return next(ApiError.NotFound(`User by id ${id} not found`));
      }

      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }

  async create(req, res, next) {
    try {
      const user = await this.service.user.createUser(req.body);

      return res.status(201).json(user);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const user = await this.service.user.updateUser(req.body);
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    const {id} = req.params;

    try {
      await this.service.user.deleteUserById(id);
      return res.sendStatus(204);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = UserController;
