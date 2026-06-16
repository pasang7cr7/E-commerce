const AppError = require("../utils/AppError");

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") throw new AppError("you are not admin", 403);
  next();
};

module.exports = adminOnly;
