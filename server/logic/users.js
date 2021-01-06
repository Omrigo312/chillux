const validator = require('validator');
const usersDao = require('../dao/users');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const login = async (user) => {
  validateLoginData(user);

  const authorizedUser = await usersDao.login(user);

  const mockSuccessfulResponse = { token: '12AB', userType: 'USER' };
  return mockSuccessfulResponse;
};

const validateLoginData = (user) => {
  const { email, password } = user;
  if (!validator.isEmail(email)) throw new ServerError(ErrorType.INVALID_EMAIL);
  if (validator.isEmpty(password)) throw new ServerError(ErrorType.EMPTY_PASSWORD);
};

const register = async (newUser) => {
  await validateRegisterData(newUser);
  const newUserId = await usersDao.register(newUser);

  return newUserId;
};

const validateRegisterData = async (user) => {
  const { email, password } = user;
  if (await usersDao.isUserExist(email)) throw new ServerError(ErrorType.USER_ALREADY_EXISTS);
  if (!validator.isEmail(email)) throw new ServerError(ErrorType.INVALID_EMAIL);
  if (!validator.isLength(password, { min: 6, max: 30 })) throw new ServerError(ErrorType.INVALID_PASSWORD);
};

module.exports = {
  login,
  register,
};
