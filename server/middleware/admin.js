const ErrorType = require('../errors/errorType');
const usersDao = require('../dao/users');
const ServerError = require('../errors/serverError');

module.exports = async function (req, res, next) {
  try {
    const isAdmin = await usersDao.isUserAdmin(req.user.id);
    if (!isAdmin) {
      throw new ServerError(ErrorType.AUTHORIZATION);
    }
    next();
  } catch (error) {
    return next(error);
  }
};
