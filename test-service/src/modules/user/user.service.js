const {generateUUID} = require('../../../../shared/utils/utils');
const ApiError = require('../../../../shared/exceptions/ApiError');

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async findAllUsers() {
    const usersTO = await this.repository.user.findAll();
    const usersVO = usersTO.map((to) => ({...to}));

    return usersVO;
  }

  async findUserById(id) {
    const userTO = await this.repository.user.findById(id);
    if (!userTO) {
      return null;
    }

    const userVO = {...userTO};

    return userVO;
  }

  async findUserByEmail(email) {
    const userTO = await this.repository.user.findByEmail(email);
    if (!userTO) {
      return null;
    }

    const userVO = {...userTO};

    return userVO;
  }

  async findUsersByNameLength(nameLength) {
    const userTO = await this.repository.user.findAllByNameLength(nameLength);
    if (!userTO) {
      return null;
    }

    const userVO = {...userTO};

    return userVO;
  }

  async createUser(userVO) {
    const userTO = {
      ...userVO,
      id: userVO.id ?? generateUUID(),
    };

    const createdUserTO = await this.repository.user.create(userTO);
    const createdUserVO = {...createdUserTO};

    return createdUserVO;
  }

  async updateUser(userVO) {
    const currentUserTO = await this.repository.user.findById(userVO.id);
    if (!currentUserTO) {
      throw ApiError.NotFound(`Person with id ${userVO.id}`);
    }

    const userTO = {
      ...currentUserTO,
      name: userVO.name,
      email: userVO.email,
    };

    const updatedUserTO = await this.repository.user.update(userTO);
    const updatedUserVO = {...updatedUserTO};

    return updatedUserVO;
  }

  async deleteUserById(id) {
    await this.repository.user.deleteById(id);
  }
}

module.exports = UserService;
