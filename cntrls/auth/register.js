const { User } = require("../../models/UserModel");
const { HttpError, errorCatcher } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const registeredEmail = await User.findOne({ email });
  if (registeredEmail) {
    next(HttpError(409, "Email in use"));
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name: name,
    email: email,
    password: hashPassword,
    voted: {
      upvoted: [],
      downvoted: [],
    },
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const userLoggenIn = await User.findByIdAndUpdate(newUser._id, { token });

  if (userLoggenIn) {
    res.status(201).json({
      status: 201,
      user: { name: name, email: newUser.email },
      token: token,
    });
  } else {
    next(HttpError(400, "Validation error"));
  }
};

module.exports = {
  register: errorCatcher(register),
};
