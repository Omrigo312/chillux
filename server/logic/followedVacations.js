const validator = require('validator');
const followedVacationsDao = require('../dao/followedVacations');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const followVacation = async (vacationId, token) => {
  let userId;
  jwt.verify(token, config.jwtSecret, (error, decoded) => {
    if (error) {
      throw new ServerError(ErrorType.INVALID_TOKEN);
    } else {
      userId = decoded.user.id;
    }
  });
  const followedVacationId = await followedVacationsDao.followVacation(vacationId, userId);
  return followedVacationId;
};

module.exports = {
  followVacation,
};
