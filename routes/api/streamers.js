const express = require("express");
const router = express.Router();

const {
    getAllStreamers,
    addStreamer,
  getOneStreamer,
  updateVotesOfStreamer,
} = require("../../cntrls");
const { addStreamerSchema } = require("../../models/StreamerModel");
const { validateBody, validateId } = require("../../helpers");

router.get("/", getAllStreamers);
router.post("/", validateBody(addStreamerSchema), addStreamer);
router.get("/:streamerId", validateId, getOneStreamer);
router.put("/:streamerId/:vote", validateId, updateVotesOfStreamer);

module.exports = router;
