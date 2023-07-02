const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrent } = require("./current");
const { googleAuth, googleRedirect } = require("./google");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  googleAuth,
  googleRedirect,
};
