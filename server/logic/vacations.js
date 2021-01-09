const validator = require('validator');
const vacationsDao = require('../dao/vacations');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const getAllVacations = async () => {
  const allVacations = await vacationsDao.getAllVacations();

  return allVacations;
};

const addVacation = async (newVacation) => {
  validateVacationData(newVacation);

  const newVacationId = await vacationsDao.addVacation(newVacation);
  return newVacationId;
};

const validateVacationData = (vacation) => {
  const { description, destination, imageUrl, price, startDate, endDate } = vacation;
  if ((imageUrl.trim() && !validator.isURL(imageUrl)) || imageUrl.match(/\.(jpeg|jpg|gif|png)$/) === null)
    throw new ServerError(ErrorType.INVALID_IMAGE_URL);
  if (!validator.isLength(description, { min: 10, max: 2000 })) throw new ServerError(ErrorType.DESCRIPTION_TOO_SHORT);
  if (validator.isEmpty(destination)) throw new ServerError(ErrorType.INVALID_DESTINATION);
  if (!validator.isNumeric(price, { no_symbols: true })) throw new ServerError(ErrorType.INVALID_PRICE);
  if (!validator.isDate(startDate)) throw new ServerError(ErrorType.INVALID_START_DATE);
  if (!validator.isDate(endDate)) throw new ServerError(ErrorType.INVALID_END_DATE);
  if (startDate >= endDate) throw new ServerError(ErrorType.INVALID_DURATION);
};

const deleteVacation = async (id) => {
  if (!(await vacationsDao.isVacationExists(id))) throw new ServerError(ErrorType.VACATION_NOT_FOUND);

  const deleteResponse = await vacationsDao.deleteVacation(id);
  return deleteResponse;
};

module.exports = {
  getAllVacations,
  addVacation,
  deleteVacation,
};
