const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const login = async (user) => {
  const sql = 'SELECT * FROM users where email =? and password =?';
  const parameters = [user.email, user.password];

  let usersLoginResult;
  try {
    usersLoginResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURRED
    // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
  }

  // A functional (!) issue which means - the email + password do not match
  // if (usersLoginResult == null || usersLoginResult.length == 0) {
  //   throw new ServerError(ErrorType.UNAUTHORIZED);
  // }

  console.log(`User ${user.email} logged in successfully!`);
  return usersLoginResult[0];
};

const register = async (user) => {
  const sql = 'INSERT INTO users (email, password, type)  values(?, ?, ?)';
  const parameters = [user.email, user.password, user.type, user.companyId];

  let userRegisterResult;
  try {
    userRegisterResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURRED
    // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
  }

  // A functional (!) issue which means - the email + password do not match
  // if (usersLoginResult == null || usersLoginResult.length == 0) {
  //   throw new ServerError(ErrorType.UNAUTHORIZED);
  // }

  console.log(`User ${user.email} registered successfully!`);
  return userRegisterResult.insertId;
};

module.exports = {
  login,
  register,
};
