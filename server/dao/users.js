const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');
const followedVacationsDao = require('../dao/followedVacations');

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

const getUserById = async (userId) => {
  const sql =
    'SELECT email, first_name as firstName, last_name as lastName, external_id as externalId FROM users WHERE id =?';
  const parameters = [userId];
  try {
    const results = await connection.executeWithParameters(sql, parameters);
    return results[0];
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Error with getting user: ${userId}`, error);
  }
};

const isUserAdmin = async (id) => {
  const sql = 'SELECT * FROM users WHERE id =?';
  const parameters = [id];
  try {
    const results = await connection.executeWithParameters(sql, parameters);
    const user = results[0];
    return user.type === 'ADMIN' ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Error with checking if user: ${id} is admin`, error);
  }
};

const changePassword = async (userId, newPassword) => {
  const sql = `UPDATE users SET password=? WHERE id=?`;
  const parameters = [newPassword, userId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, 'Error with changing user password', error);
  }
};

const updateName = async (userId, fullName) => {
  const { firstName, lastName } = fullName;
  const sql = `UPDATE users SET first_name=?, last_name=? WHERE id=?`;
  const parameters = [firstName, lastName, userId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, 'Error with updating user name', error);
  }
};

const getUserPassword = async (userId) => {
  const sql = 'SELECT password FROM users WHERE id =?';
  const parameters = [userId];
  try {
    const res = await connection.executeWithParameters(sql, parameters);
    return res[0];
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, 'Error with getting user password', error);
  }
};

const removeUser = async (userId) => {
  await followedVacationsDao.removeAllFollowedByUser(userId);

  const sql = 'DELETE FROM users WHERE id=?';
  const parameters = [userId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Error with deleting user`, error);
  }
};

module.exports = {
  login,
  register,
  isUserExists,
  isUserAdmin,
  googleRegister,
  getUserById,
  changePassword,
  updateName,
  getUserPassword,
  removeUser,
};
