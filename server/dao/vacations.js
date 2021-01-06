const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const getAllVacations = async () => {
  const sql = 'SELECT * FROM vacations';

  try {
    const allVacations = await connection.execute(sql);
    return allVacations;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
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

const deleteVacation = async (id) => {
  const sql = 'DELETE FROM users WHERE id=?';
  const parameters = [id];

  try {
    await connection.executeWithParameters(sql, parameters);

    return 'Vacation deleted successfully';
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, 'Error with deleting vacation.', error);
  }
};

module.exports = {
  getAllVacations,
  addVacation,
  deleteVacation,
};
