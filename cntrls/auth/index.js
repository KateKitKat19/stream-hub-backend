const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrent } = require("./current");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
};
