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
    throw new ServerError(ErrorType.GENERAL_ERROR, 'Error while retrieving vacations', error);
  }
};

const getVacationById = async (id) => {
  const sql =
    'SELECT id, description, destination, price, followers, image_url as imageUrl, start_date as startDate, end_date as endDate FROM vacations WHERE id=?';
  const parameters = [id];

  try {
    const vacation = await connection.executeWithParameters(sql, parameters);
    return vacation[0];
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Error with retrieving vacation with id=${id}`, error);
  }
};

const addVacation = async (newVacation) => {
  const { description, destination, imageUrl, price, followers, startDate, endDate } = newVacation;
  const sql = `INSERT INTO vacations (description, destination, image_url, price, followers, start_date, end_date)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const parameters = [description, destination, imageUrl, price, followers, startDate, endDate];

  try {
    const addVacationResult = await connection.executeWithParameters(sql, parameters);

    console.log(`Vacation added successfully!`);
    return addVacationResult.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(newVacation), error);
  }
};

const modifyVacation = async (id, modifiedVacation) => {
  const { description, destination, imageUrl, price, followers, startDate, endDate } = modifiedVacation;
  const sql = `UPDATE vacations SET description=?, destination=?, image_url=?, price=?, followers=?, start_date=?, end_date=? WHERE id=?`;
  const parameters = [description, destination, imageUrl, price, followers, startDate, endDate, id];

  try {
    const modifyVacationResult = await connection.executeWithParameters(sql, parameters);

    console.log(`Vacation modified successfully!`);
    return modifyVacationResult.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(modifiedVacation), error);
  }
};

const deleteVacation = async (id) => {
  const sql = 'DELETE FROM vacations WHERE id=?';
  const parameters = [id];

  try {
    await connection.executeWithParameters(sql, parameters);

    return 'Vacation deleted successfully';
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, 'Error with deleting vacation.', error);
  }
};

const isVacationExists = async (id) => {
  const sql = 'SELECT * FROM vacations WHERE id =?';
  const parameters = [id];
  try {
    const result = await connection.executeWithParameters(sql, parameters);
    return result.length ? true : false;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, `Vacation id: ${id}`, error);
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
