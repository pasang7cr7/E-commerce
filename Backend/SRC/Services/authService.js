const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");
const AppError = require("../utils/AppError");

exports.registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("Email Already Registeres", 400);

  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new AppError("Not registered", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("password is incorrect", 400);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};
