const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const AppError = require("../utils/AppError");

const catchAsync = require("../utils/catchAsync");

const protect = catchAsync(async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) throw new AppError("no token provided", 400);
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) throw new AppError("User not found", 404);
  req.user = user;
  next();
});

module.exports = protect;
