const connection = require('./connection-wrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const login = async (user) => {
  const sql = 'SELECT * FROM users where username =? and password =?';

  const parameters = [user.email, user.password];

  let usersLoginResult;
  try {
    usersLoginResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURRED
    // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
  }

  // A functional (!) issue which means - the userName + password do not match
  if (usersLoginResult == null || usersLoginResult.length == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  console.log('All good ! ');
  return usersLoginResult[0];
};

module.exports = {
  login,
};
