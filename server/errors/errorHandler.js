const errorHandler = (error, request, response, next) => {
  if (error.errorType === undefined) {
    return response.status(700).json({ error: 'General error' });
  }

  if (error.errorType.isShowStackTrace) {
    console.error(error);
  }

  const { httpCode, message } = error.errorType;
  return response.status(httpCode).json({ error: message });
};

module.exports = errorHandler;
