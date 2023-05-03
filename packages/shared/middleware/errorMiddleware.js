const ApiError = require('../exceptions/ApiError');

module.exports = (err, __req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message, errors: err.errors});
  }

  return res.status(500).json({message: `Internal server error! ${err.message}`});
};
