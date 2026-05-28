const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");
const AppError = require("../utils/AppError");
exports.registerUser = async (name, email, password) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) throw new AppError("Email Already Registeres", 400);

  const newUser = await User.create({ name, email, password });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, newUser };
};
