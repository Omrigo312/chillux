const connection = require('./connectionWrapper');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const followVacation = async (vacationId, userId) => {
  const sql = `INSERT INTO followed_vacations (vacation_id, user_id)
                 VALUES (?, ?)`;
  const parameters = [vacationId, userId];

  try {
    const followVacationResult = await connection.executeWithParameters(sql, parameters);

    console.log(`Vacation followed successfully!`);
    return followVacationResult.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify({ vacationId, userId }), error);
  }
};

module.exports = {
  followVacation,
};
