const { User } = require("../../models/UserModel");
const { HttpError, errorCatcher } = require("../../helpers");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const registeredEmail = await User.findOne({ email });
  if (registeredEmail) {
    next(HttpError(409, "Email in use"));
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  if (newUser) {
    res.status(201).json({
      status: 201,
      user: { name: name, email: newUser.email },
    });
  } else {
    next(HttpError(400, "Validation error"));
  }
};

module.exports = {
  register: errorCatcher(register),
};
