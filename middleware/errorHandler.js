const {
  VAlIDATION_ERROR,
  UNAUTHORIZED,
  NOT_FOUND,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
} = require("../helper/constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case VAlIDATION_ERROR:
      res.json({
        title: "Validation Found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case FORBIDDEN:
      res.json({
        title: "Request forbidden",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    default:
      console.log('No error')
      break;
  }
};

module.exports = errorHandler;
