const usersDao = require('../dao/users');

const login = async (user) => {
  const userLoginData = await usersDao.login(user);
  // Do something with cache and stuff.. token....
  console.log(userLoginData);

  const mockSuccessfulResponse = { token: '12AB', userType: 'USER' };
  return mockSuccessfulResponse;
};

const register = async (newUser) => {
  if (await usersDao.isUserExistByName(newUser.email)) {
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
