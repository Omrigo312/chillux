const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const followVacation = async (vacationId, userId) => {
  const sql = `INSERT INTO followed_vacations (vacation_id, user_id)
                 VALUES (?, ?)`;
  const parameters = [vacationId, userId];

  try {
    const followVacationResult = await connection.executeWithParameters(sql, parameters);

    return followVacationResult.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify({ vacationId, userId }), error);
  }
};

const unfollowVacation = async (vacationId, userId) => {
  const sql = `DELETE FROM followed_vacations WHERE vacation_id=? AND user_id=?`;
  const parameters = [vacationId, userId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify({ vacationId, userId }), error);
  }
};

const getFollowedVacations = async (userId) => {
  const sql = `SELECT id
                  FROM vacations v
               LEFT JOIN (SELECT vacation_id FROM followed_vacations WHERE user_id =?) followed_vacations 
                  ON v.id = followed_vacations.vacation_id
                    WHERE id = followed_vacations.vacation_id`;
  const parameters = [userId];

  try {
    const followedVacations = await connection.executeWithParameters(sql, parameters);
    return followedVacations;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify({ userId }), error);
  }
};

const removeAllFollowedByUser = async (userId) => {
  const sql = 'DELETE FROM followed_vacations WHERE user_id=?';
  const parameters = [userId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, 'Error with removing all followed vacations by user', error);
  }
};

module.exports = {
  followVacation,
  unfollowVacation,
  getFollowedVacations,
  removeAllFollowedByUser,
};
