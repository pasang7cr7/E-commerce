const authService = require("../Services/authService");
const catchAsync = require("../utils/catchAsync");

exports.registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  const result = await authService.registerUser(name, email, password);
  res.status(201).json({ success: true, ...result });
};
