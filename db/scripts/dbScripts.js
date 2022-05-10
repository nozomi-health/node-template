const {getStringValue, removeNulls} = require('../../shared/utils/db');

const SELECT = (tableName, selectParams, whereParams, joinSchema) => {
  const joinSelects = joinSchema && joinSchema.pop();
  removeNulls(selectParams);
  removeNulls(whereParams);

  const selectValue = selectParams ? selectParams.map((param) => `"${tableName}".${param}`).join(', ') : '*';
  const joinValue = joinSelects ? `, ${joinSelects.map((param) => `"${joinSchema[0]}".${param}`).join(', ')}` : '';

  return `SELECT ${selectValue}${joinValue} FROM public."${tableName}" ${joinSchema ? join(tableName, joinSchema) : ''} ${whereParams ? whereClause(tableName, whereParams) : ''};`.replace(/\s+/g, ' ').trim();
};

const INSERT = (tableName, objectTO) => {
  removeNulls(objectTO);
  const keys = Object.keys(objectTO).toString();
  const values = Object.values(objectTO).map((object) => getStringValue(object)).toString();

  return `INSERT INTO public."${tableName}" (${keys}) VALUES (${values});`.replace(/\s+/g, ' ').trim();
};

const UPDATE = (tableName, objectTO, whereParams) => {
  removeNulls(objectTO);

  const values = Object.entries(objectTO).map((object) => `${object[0]} = ${getStringValue(object[1])}`).toString();
  return `UPDATE public."${tableName}" SET ${values} ${whereClause(tableName, whereParams)};`.replace(/\s+/g, ' ').trim();
};

const DELETE = (tableName, whereParams) => {
  removeNulls(whereParams);
  return `DELETE FROM public."${tableName}" ${whereClause(tableName, whereParams)};`.replace(/\s+/g, ' ').trim();
};

const join = (tableName, joinSchema) => {
  return `${joinSchema[1]} public."${joinSchema[0]}" ON "${tableName}".id = "${joinSchema[0]}".${tableName}Id`;
};

const whereClause = (tableName, params) => {
  const wheres = Object.entries(params).map((param) => `"${tableName}".${param[0]} = ${getStringValue(param[1])}`)
    .join(' AND ');

  return `WHERE ${wheres}`;
};

const getWhereString = (tableName, obj) => {
  if (!obj) {
    return '';
  }

  const result = Object.keys(obj).map((key) => {
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
  SELECT,
  INSERT,
  UPDATE,
  DELETE,
  getWhereString,
  getValuesFromObject,
};
