const ApiError = require("../utils/ApiError");

module.exports = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    throw new ApiError("Admin access required", 403);
  }
  next();
};
