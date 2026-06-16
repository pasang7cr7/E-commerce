const authService = require("../Services/authService");
const catchAsync = require("../utils/catchAsync");

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const result = await authService.registerUser(name, email, password);
  res.status(201).json({ success: true, ...result });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(201).json({ success: true, ...result });
});
