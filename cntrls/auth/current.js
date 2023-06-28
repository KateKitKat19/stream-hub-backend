const { User } = require("../../models/UserModel");
const { HttpError, errorCatcher } = require("../../helpers");

const getCurrent = async (req, res, next) => {
  const token = req.body;
  const isCurrent = await User.findOne({ token });

  if (isCurrent) {
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
  getCurrent: errorCatcher(getCurrent),
};
