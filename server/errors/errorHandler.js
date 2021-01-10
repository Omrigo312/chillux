const errorHandler = (error, req, res, next) => {
  if (error.errorType === undefined) {
    console.log(error);
    return res.status(700).json({ error: 'General error' });
  }

  if (error.errorType.isShowStackTrace) {
    console.error(error);
  }

  const { httpCode, message } = error.errorType;
  return res.status(httpCode).json({ message });
};

module.exports = errorHandler;
