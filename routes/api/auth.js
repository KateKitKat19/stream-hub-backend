const express = require("express");
const router = express.Router();
const { register, login } = require("../../cntrls/auth");
const { validateBody } = require("../../helpers");
const { registerSchema, signinSchema } = require("../../models/UserModel");

router.post("/registration", validateBody(registerSchema), register);
router.post("/login", validateBody(signinSchema), login);

module.exports = router;
