const { User } = require("../../models/UserModel");
const { HttpError, errorCatcher } = require("../../helpers");

const getCurrent = async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
      next(HttpError(401));
    }
  const isCurrent = await User.findOne({ token });

  if (isCurrent) {
    res.status(201).json({
      status: 201,
      user: { name: isCurrent.name, email: isCurrent.email },
      token: token,
    });
  } else {
    next(HttpError(400, "Validation error"));
  }
};

module.exports = {
  getCurrent: errorCatcher(getCurrent),
};
