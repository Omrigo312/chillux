const login = async (user) => {
  let userLoginData = await usersDao.login(user);

  // Do something with cache and stuff.. token....
  console.log(userLoginData);

  let mockSuccessfulResponse = { token: '12AB', type: userLoginData.type };
  return mockSuccessfulResponse;
};

module.exports = {
  login,
};
