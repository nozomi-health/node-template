const {generateUUID} = require('../../../../shared/utils/utils');
const ApiError = require('../../../../shared/exceptions/ApiError');
const Integration = require('../../integration/integration');

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async findAllUsers(populateStuff) {
    const usersTO = await this.repository.user.findAll();

    if (!populateStuff) {
      const usersVO = usersTO.map((to) => ({...to}));
      return usersVO;
    }

    const userPromises = usersTO.map(async (to) => {
      const stuff = await Integration.getData();
      return {...to, stuff};
    });

    const usersVO = await Promise.all(userPromises);

    return usersVO;
  }

  async findUserById(id, populateStuff) {
    const userTO = await this.repository.user.findById(id);
    if (!userTO) {
      return null;
    }

    if (!populateStuff) {
      const userVO = {...userTO};
      return userVO;
    }

    const stuff = await Integration.getData();
    const userVO = {...userTO, stuff};

    return userVO;
  }

  async findUserByEmail(email, populateStuff) {
    const userTO = await this.repository.user.findByEmail(email);
    if (!userTO) {
      return null;
    }

    if (!populateStuff) {
      const userVO = {...userTO};
      return userVO;
    }

    const stuff = await Integration.getData();
    const userVO = {...userTO, stuff};

    return userVO;
  }

  async findUsersByNameLength(nameLength, populateStuff) {
    const usersTO = await this.repository.user.findAllByNameLength(nameLength);
    
    if (!populateStuff) {
      const usersVO = usersTO.map((to) => ({...to}));
      return usersVO;
    }

    const userPromises = usersTO.map(async (to) => {
      const stuff = await Integration.getData();
      return {...to, stuff};
    });

    const usersVO = await Promise.all(userPromises);

    return usersVO;
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
