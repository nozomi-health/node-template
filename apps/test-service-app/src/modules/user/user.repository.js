const BaseRepository = require('@node-template/shared/classes/BaseRepository');

class UserRepository extends BaseRepository {
  constructor(dbClient) {
    super(
      dbClient,
      'User',
      [
        'id',
        'name',
        'email',
        'createdAt',
        'updatedAt',
        'version',
      ],
    );
  }

  async findByEmail(email) {
    const resultTO = await this.entityRepository
      .findOne(this.tableName, this.columnNames, {email});

    return resultTO;
  }

  async findAllByNameLength(length) {
    const sql = `SELECT 
      "id", "name", "email", "createdAt", "updatedAt", "version"
      FROM public."${this.tableName}" 
      WHERE LENGTH("${this.tableName}"."name") = ${length}`;

    const queryResult = await this.entityRepository.query(sql);
    const resultTO = queryResult.rows;

    return resultTO;
  }
}

module.exports = UserRepository;
