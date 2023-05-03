const {checkSchema} = require('express-validator');

const userSchema = checkSchema({
  id: {
    in: ['body'],
    isUUID: true,
    optional: true,
  },
  name: {
    in: ['body'],
    isLength: {
      options: {
        max: 250,
        min: 1,
      },
    },
  },
  email: {
    isEmail: true,
    in: ['body'],
  },
});

module.exports = {
  user: userSchema,
};
