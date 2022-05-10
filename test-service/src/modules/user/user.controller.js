const BaseController = require('../../../../shared/classes/BaseController');
const validationSchemas = require('../../validators/schemas');
const validate = require('../../../../shared/middleware/validationMiddleware');
const ApiError = require('../../../../shared/exceptions/ApiError');

class UserController extends BaseController {
  constructor(service) {
    super(service);

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    // добавить валидации кверей и параметры
    // add nameLength query
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getById);

    this.router.delete('/:id', this.delete);

    this.router.post('/', validate([
      validationSchemas.user,
    ]), this.create);

    this.router.put(
      '/:id',
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

  async getAll(__req, res, next) {
    try {
      const users = await this.service.user.findAllUsers();
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
