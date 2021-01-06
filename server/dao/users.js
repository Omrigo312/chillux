const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const login = async (user) => {
  const { email, password } = user;
  const sql = 'SELECT * FROM users where email =? and password =?';
  const parameters = [email, password];

  let usersLoginResult;
  try {
    usersLoginResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
  }

  // User does not exist or incorrect password
  if (!usersLoginResult || !usersLoginResult.length) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  console.log(`User ${email} logged in successfully!`);
  return usersLoginResult[0];
};

const register = async (newUser) => {
  const { email, password, type } = newUser;
  const sql = 'INSERT INTO users (email, password, type)  values(?, ?, ?)';
  const parameters = [email, password, type];

  try {
    const registerResult = await connection.executeWithParameters(sql, parameters);

    console.log(`User ${email} registered successfully!`);
    return registerResult.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(newUser), error);
  }
};

const isUserExist = async (email) => {
  const sql = 'SELECT * FROM users where email =?';
  const parameters = [email];
  try {
    const result = await connection.executeWithParameters(sql, parameters);
    return result.length ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, email, error);
  }
};

module.exports = {
  login,
  register,
  isUserExist,
};
