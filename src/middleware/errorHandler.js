const ApiError = require("../utils/ApiError");

module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err);
  let statusCode = 500;
  let message = "Something went wrong";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
