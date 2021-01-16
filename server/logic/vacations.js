const validator = require('validator');
const vacationsDao = require('../dao/vacations');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const getAllVacations = async () => {
  const allVacations = await vacationsDao.getAllVacations();
  return allVacations;
};

const getVacationById = async (vacationId) => {
  const vacation = await vacationsDao.getVacationById(vacationId);
  return vacation;
};

const addVacation = async (newVacation) => {
  validateVacationData(newVacation);

  await vacationsDao.addVacation(newVacation);
};

const deleteVacation = async (vacationId) => {
  if (!(await vacationsDao.isVacationExists(vacationId))) throw new ServerError(ErrorType.VACATION_NOT_FOUND);

  const allVacations = await vacationsDao.deleteVacation(vacationId);
  return allVacations;
};

const modifyVacation = async (vacationId, modifiedVacation) => {
  if (!(await vacationsDao.isVacationExists(vacationId))) throw new ServerError(ErrorType.VACATION_NOT_FOUND);

  validateVacationData(modifiedVacation);

  await vacationsDao.modifyVacation(vacationId, modifiedVacation);
};

const validateVacationData = (vacation) => {
  const { description, destination, imageUrl, price, startDate, endDate } = vacation;
  if (imageUrl.trim() && (!validator.isURL(imageUrl) || imageUrl.match(/\.(jpeg|jpg|gif|png)$/) === null))
    throw new ServerError(ErrorType.INVALID_IMAGE_URL);
  if (!validator.isLength(description, { min: 10, max: 2000 })) throw new ServerError(ErrorType.DESCRIPTION_TOO_SHORT);
  if (!validator.isLength(destination, { max: 20 })) throw new ServerError(ErrorType.INVALID_DESTINATION);
  if (validator.isEmpty(destination)) throw new ServerError(ErrorType.INVALID_DESTINATION);
  if (isNaN(price) && !validator.isNumeric(price, { no_symbols: true })) throw new ServerError(ErrorType.INVALID_PRICE);
  if (!validator.isDate(startDate)) throw new ServerError(ErrorType.INVALID_START_DATE);
  if (!validator.isDate(endDate)) throw new ServerError(ErrorType.INVALID_END_DATE);
  if (startDate >= endDate) throw new ServerError(ErrorType.INVALID_DURATION);
};

module.exports = {
  getAllVacations,
  addVacation,
  deleteVacation,
  modifyVacation,
  getVacationById,
};
