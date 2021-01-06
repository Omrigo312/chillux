const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const login = async (user) => {
  const sql = 'SELECT * FROM users where email =? and password =?';
  const parameters = [user.email, user.password];

  try {
    const usersLoginResult = await connection.executeWithParameters(sql, parameters);

    // User does not exist or incorrect password
    if (!usersLoginResult || !usersLoginResult.length) {
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    console.log(`User ${user.email} logged in successfully!`);
    return usersLoginResult[0];
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
  }
};

const register = async (user) => {
  const sql = 'INSERT INTO users (email, password, type)  values(?, ?, ?)';
  const parameters = [user.email, user.password, user.type, user.companyId];

  try {
    const userRegisterResult = await connection.executeWithParameters(sql, parameters);

    console.log(`User ${user.email} registered successfully!`);
    return userRegisterResult.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
  }
};

const isUserExist = async (email) => {
  const sql = 'SELECT * FROM users where email =?';
  const parameters = [email];
  try {
    const result = await connection.executeWithParameters(sql, parameters);
    return result ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, email, error);
  }
};

module.exports = {
  login,
  register,
  isUserExist,
};
