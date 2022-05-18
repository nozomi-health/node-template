const {getStringValue} = require('../../shared/utils/db');

const getWhereString = (tableName, obj) => {
  if (!obj) {
    return '';
  }

  const result = Object.keys(obj).map((key) => {
    if (obj[key] === undefined) {
      throw new Error(`Undefined is not supported in where clause (in ${key})`);
    }

    if (obj[key] === null) {
      return `"${tableName}"."${key}" IS NULL`;
    }

    return `"${tableName}"."${key}" = ${getStringValue(obj[key])}`;
  }).join(' AND ');

  return result;
};

const getValuesFromObject = (obj) => {
  if (!obj) {
    return [];
  }

  const values = Object.values(obj).map((object) => getStringValue(object));
  return values;
};

module.exports = {
  getWhereString,
  getValuesFromObject,
};
