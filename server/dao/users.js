const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const login = async (user) => {
  const sql = 'SELECT * FROM users WHERE email =?';
  const parameters = [user.email];

  let loginResult;
  try {
    loginResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
  }

  // User does not exist or incorrect password
  if (!loginResult || !loginResult.length) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  return loginResult[0];
};

const register = async (newUser) => {
  const { email, password, type } = newUser;
  const sql = 'INSERT INTO users (email, password, type) VALUES(?, ?, ?)';
  const parameters = [email, password, type];

  try {
    const registerResult = await connection.executeWithParameters(sql, parameters);

    return registerResult.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(newUser), error);
  }
};

const googleRegister = async (newUser) => {
  const { email, password, externalId, firstName, lastName, type } = newUser;
  const sql = 'INSERT INTO users (email, password, type, external_id, first_name,last_name) VALUES(?, ?, ? ,? ,? ,?)';
  const parameters = [email, password, type, externalId, firstName, lastName];

  try {
    const registerResult = await connection.executeWithParameters(sql, parameters);

    return registerResult.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(newUser), error);
  }
};

const isUserExists = async (email) => {
  const sql = 'SELECT * FROM users WHERE email =?';
  const parameters = [email];
  try {
    const results = await connection.executeWithParameters(sql, parameters);
    return results.length ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, email, error);
  }
};

const isUserAdmin = async (id) => {
  const sql = 'SELECT * FROM users WHERE id =?';
  const parameters = [id];
  try {
    const results = await connection.executeWithParameters(sql, parameters);
    const user = results[0]
    return user.type === 'ADMIN' ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, id, error);
  }
};

module.exports = {
  login,
  register,
  isUserExists,
  isUserAdmin,
  googleRegister,
};
