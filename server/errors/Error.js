class Error {
  constructor(id, httpCode, message, isShowStackTrace) {
    this.id = id;
    this.httpCode = httpCode;
    this.message = message;
    this.isShowStackTrace = isShowStackTrace;
  }
}

module.exports = Error;
