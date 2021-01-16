const validator = require('validator');
const usersDao = require('../dao/users');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');

const login = async (user) => {
  validateLoginData(user);

  const authorizedUser = await usersDao.login(user);
  const isMatch = await bcrypt.compare(user.password, authorizedUser.password);

  if (!isMatch) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  const payload = {
    user: {
      id: authorizedUser.id,
    },
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtTimeout });
  return { token, userType: authorizedUser.type };
};

const confirmPassword = async (userId, password) => {
  const authorizedUser = await usersDao.getUserPassword(userId);
  const isMatch = await bcrypt.compare(password, authorizedUser.password);

  if (!isMatch) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
};

const googleLogin = async (user) => {
  if (!(await usersDao.isUserExists(user.email))) {
    const newUser = {
      email: user.email,
      password: generator.generate({
        length: 10,
        numbers: true,
      }),
      firstName: user.givenName,
      lastName: user.familyName,
      externalId: user.googleId,
      type: 'USER',
    };
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await usersDao.googleRegister(newUser);
  }

  const authorizedUser = await usersDao.login(user);

  const payload = {
    user: {
      id: authorizedUser.id,
    },
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtTimeout });
  return { token, userType: authorizedUser.type };
};

const validateLoginData = (user) => {
  const { email, password } = user;
  if (!validator.isEmail(email)) throw new ServerError(ErrorType.INVALID_EMAIL);
  if (validator.isEmpty(password)) throw new ServerError(ErrorType.EMPTY_PASSWORD);
};

const register = async (newUser) => {
  await validateRegisterData(newUser);

  // Encrypt the password using bcrypt
  const salt = await bcrypt.genSalt();
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await usersDao.register(newUser);
};

const validateRegisterData = async (user) => {
  const { email, password } = user;
  if (await usersDao.isUserExists(email)) throw new ServerError(ErrorType.USER_ALREADY_EXISTS);
  if (!validator.isEmail(email)) throw new ServerError(ErrorType.INVALID_EMAIL);
  if (!validator.isLength(password, { min: 6, max: 30 })) throw new ServerError(ErrorType.INVALID_PASSWORD);
};

const changePassword = async (userId, newPassword) => {
  if (!validator.isLength(newPassword, { min: 6, max: 30 })) throw new ServerError(ErrorType.INVALID_PASSWORD);

  const salt = await bcrypt.genSalt();
  newPassword = await bcrypt.hash(newPassword, salt);

  await usersDao.changePassword(userId, newPassword);
};

const updateName = async (userId, fullName) => {
  if (!validator.isLength(fullName.firstName, { min: 0, max: 25 })) throw new ServerError(ErrorType.INVALID_NAME);
  if (!validator.isLength(fullName.lastName, { min: 0, max: 25 })) throw new ServerError(ErrorType.INVALID_NAME);

  await usersDao.updateName(userId, fullName);
};

const getUserById = async (userId) => {
  const user = await usersDao.getUserById(userId);
  return user;
};

const deleteUser = async (userId) => {
  await usersDao.deleteUser(userId);
};

module.exports = {
  login,
  googleLogin,
  register,
  getUserById,
  changePassword,
  updateName,
  confirmPassword,
  deleteUser,
};
