const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../../cntrls/auth");
const { validateBody } = require("../../helpers");
const { registerSchema, signinSchema } = require("../../models/UserModel");
const authentificate = require("../../middlewars/authentificate");


router.post("/registration", validateBody(registerSchema), register);
router.post("/login", validateBody(signinSchema), login);
router.post("/logout", authentificate, logout);

module.exports = router;
