const usersDao = require('../dao/users');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const login = async (user) => {
  const userLoginData = await usersDao.login(user);
  console.log(userLoginData);

  const mockSuccessfulResponse = { token: '12AB', userType: 'USER' };
  return mockSuccessfulResponse;
};

const register = async (newUser) => {
  if (await usersDao.isUserExist(newUser.email)) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }
  const userRegisterData = await usersDao.register(newUser);
  console.log(userRegisterData);

  return userRegisterData;
};

module.exports = {
  login,
  register,
};
