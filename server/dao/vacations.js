const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const getAllVacations = async () => {
  const sql =
    'SELECT id, description, destination, price, followers, image_url as imageUrl, start_date as startDate, end_date as endDate FROM vacations';

  try {
    const allVacations = await connection.execute(sql);
    return allVacations;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, 'Error while retrieving all vacations', error);
  }
};

const getVacationById = async (vacationId) => {
  const sql =
    'SELECT id, description, destination, price, followers, image_url as imageUrl, start_date as startDate, end_date as endDate FROM vacations WHERE id=?';
  const parameters = [vacationId];

  try {
    const vacation = await connection.executeWithParameters(sql, parameters);
    return vacation[0];
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Error with retrieving vacation with id=${vacationId}`, error);
  }
};

const addVacation = async (newVacation) => {
  const { description, destination, imageUrl, price, followers, startDate, endDate } = newVacation;
  const sql = `INSERT INTO vacations (description, destination, image_url, price, followers, start_date, end_date)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const parameters = [description, destination, imageUrl, price, followers, startDate, endDate];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Error with adding vacation: ${JSON.stringify(newVacation)}`, error);
  }
};

const modifyVacation = async (vacationId, modifiedVacation) => {
  const { description, destination, imageUrl, price, followers, startDate, endDate } = modifiedVacation;
  const sql = `UPDATE vacations SET description=?, destination=?, image_url=?, price=?, followers=?, start_date=?, end_date=? WHERE id=?`;
  const parameters = [description, destination, imageUrl, price, followers, startDate, endDate, vacationId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Error with modifying vacation (${vacationId})`, error);
  }
};

const deleteVacation = async (vacationId) => {
  const sql = 'DELETE FROM vacations WHERE id=?';
  const parameters = [vacationId];

  try {
    await connection.executeWithParameters(sql, parameters);
    const getAllSql =
      'SELECT id, description, destination, price, followers, image_url as imageUrl, start_date as startDate, end_date as endDate FROM vacations';
    const allVacations = await connection.execute(getAllSql);
    return allVacations;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Error with deleting vacation (${vacationId}).`, error);
  }
};

const isVacationExists = async (vacationId) => {
  const sql = 'SELECT * FROM vacations WHERE id =?';
  const parameters = [vacationId];
  try {
    const result = await connection.executeWithParameters(sql, parameters);
    return result.length ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Error with checking if vacation (${vacationId}) exists`, error);
  }
};

module.exports = {
  getAllVacations,
  addVacation,
  deleteVacation,
  isVacationExists,
  modifyVacation,
  getVacationById,
};
