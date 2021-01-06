const validator = require('validator');
const usersDao = require('../dao/users');
const vacationsDao = require('../dao/vacations');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');

const getAllVacations = async () => {
  const allVacations = await vacationsDao.getAllVacations();

  const mockAllVacations = [
    {
      description: 'Climb Mount Everest',
      destination: 'Nepal',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Everest_kalapatthar.jpg',
      price: 5000,
      followers: 17,
      startDate: new Date(2021, 0, 15),
      endDate: new Date(2021, 1, 22),
    },
    {
      description: "Relax on Thailand's beautiful beaches",
      destination: 'Thailand',
      imageUrl: 'https://www.fodors.com/wp-content/uploads/2019/02/thai-beaches-hero-.jpg',
      price: 2300,
      followers: 8,
      startDate: new Date(2021, 3, 13),
      endDate: new Date(2021, 3, 25),
    },
  ];

  // return allVacations;
  return mockAllVacations;
};

const addVacation = async (newVacation) => {
  validateVacationData(newVacation);

  const newVacationId = await vacationsDao.addVacation(newVacation);
  return newVacationId;
};

const validateVacationData = (vacation) => {
  const { description, destination, imageUrl, price, startDate, endDate } = vacation;
  if (imageUrl.trim() && !validator.isURL(imageUrl)) throw new ServerError(ErrorType.INVALID_IMAGE_URL);
  if (!validator.isLength(description, { min: 10, max: 2000 })) throw new ServerError(ErrorType.DESCRIPTION_TOO_SHORT);
  if (validator.isEmpty(destination)) throw new ServerError(ErrorType.INVALID_DESTINATION);
  if (!validator.isNumeric(price, { no_symbols: true })) throw new ServerError(ErrorType.INVALID_PRICE);
  if (!validator.isDate(startDate)) throw new ServerError(ErrorType.INVALID_START_DATE);
  if (!validator.isDate(endDate)) throw new ServerError(ErrorType.INVALID_END_DATE);
  if (startDate >= endDate) throw new ServerError(ErrorType.INVALID_DURATION);
};

const deleteVacation = async (id) => {
  const deleteResponse = await vacationsDao.deleteVacation(id);
  return deleteResponse;
};

module.exports = {
  getAllVacations,
  addVacation,
  deleteVacation,
};
