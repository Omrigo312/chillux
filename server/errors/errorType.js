const ErrorType = {
  GENERAL_ERROR: { id: 1, httpCode: 600, message: 'General error.', isShowStackTrace: true },
  USER_NAME_ALREADY_EXIST: { id: 2, httpCode: 601, message: 'User already exists', isShowStackTrace: false },
  UNAUTHORIZED: { id: 3, httpCode: 401, message: 'Invalid email or password', isShowStackTrace: false },
};

module.exports = ErrorType;
