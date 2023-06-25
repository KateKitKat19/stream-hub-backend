const express = require("express");
const router = express.Router();
const { getAllStreamers } = require("../../cntrls/getAllStreamers");

router.get("/", getAllStreamers);

module.exports = router;
