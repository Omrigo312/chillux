const usersDao = require('../dao/users');

const login = async (user) => {
  const userLoginData = await usersDao.login(user);
  // Do something with cache and stuff.. token....
  // console.log(userLoginData);

  const mockSuccessfulResponse = { token: '12AB', userType: 'USER' };
  return mockSuccessfulResponse;
};

module.exports = {
  login,
};
