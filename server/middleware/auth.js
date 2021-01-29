const jwt = require('jsonwebtoken');
const config = require('../config.json');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  
  // Check if not token
  if (!token) {
    throw new ServerError(ErrorType.NO_TOKEN);
  }

  // Verify token
  try {
    jwt.verify(token, config.jwtSecret, (error, decoded) => {
      if (error) {
        throw new ServerError(ErrorType.INVALID_TOKEN);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    return next(error);
  }
};
