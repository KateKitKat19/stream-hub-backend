const { User } = require("../../models/UserModel");
const { HttpError, errorCatcher } = require("../../helpers");

const getCurrent = async (req, res, next) => {
  const user = req.user;
  if (user) {
    res.status(201).json({
      status: 201,
      user: { name: user.name, email: user.email },
    });
  } else {
    next(HttpError(400, "Validation error"));
  }
};

module.exports = {
  getCurrent: errorCatcher(getCurrent),
};
