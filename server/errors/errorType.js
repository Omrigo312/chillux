const Error = require('./Error');

const ErrorType = {
  GENERAL_ERROR: new Error(1, 600, 'General error.', true),
  USER_ALREADY_EXISTS: new Error(2, 601, 'User already exists.', false),
  UNAUTHORIZED: new Error(3, 401, 'Email or password is incorrect.', false),
  INVALID_EMAIL: new Error(4, 602, 'Please include a valid email.', false),
  EMPTY_PASSWORD: new Error(5, 602, 'A password is required.', false),
  INVALID_NAME: new Error(19, 602, 'First name and last name must be under 25 characters', false),
  INVALID_PASSWORD: new Error(6, 602, 'Your password must be 6-30 characters long.', false),
  DESCRIPTION_TOO_SHORT: new Error(7, 603, 'Description must be at least 10 characters long.', false),
  INVALID_DESTINATION: new Error(9, 603, 'Please include a destination.', false),
  INVALID_IMAGE_URL: new Error(10, 603, 'Invalid image URL. Leave empty or insert a correct image URL.', false),
  INVALID_PRICE: new Error(11, 603, 'Please include a valid price', false),
  INVALID_START_DATE: new Error(12, 603, 'Please include a valid start date.', false),
  INVALID_END_DATE: new Error(13, 603, 'Please include a valid end date.', false),
  INVALID_DURATION: new Error(14, 603, 'End date must be after start date', false),
  VACATION_NOT_FOUND: new Error(15, 604, 'Cannot delete vacation. Not found.', true),
  INVALID_TOKEN: new Error(16, 605, 'Invalid token', false),
  NO_TOKEN: new Error(17, 605, 'No token', false),
  AUTHORIZATION: new Error(18, 605, 'You are not an admin', false),
};

module.exports = ErrorType;
