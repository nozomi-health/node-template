const handleStringQuotes = (value) => {
  if (typeof value === 'string' || value instanceof String) {
    // eslint-disable-next-line quotes
    return value.replace(/'/g, "''");
  }

  return value;
};

const getStringValue = (value) => {
  if (typeof value === 'string' || value instanceof String) {
    // eslint-disable-next-line quotes
    const result = value.replace(/'/g, "''");
    return `'${result}'`;
  }

  if (value === null || value === undefined) {
    return 'NULL';
  }

  return value;
};

const removeNulls = (obj) => {
  if (obj) {
    Object.keys(obj).forEach((propName) => {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName]; // eslint-disable-line no-param-reassign
      }
    });
  }

  return obj;
};

module.exports = {
  getStringValue,
  removeNulls,
  handleStringQuotes,
};
