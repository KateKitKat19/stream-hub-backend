const express = require("express");
const router = express.Router();
const multer = require("multer");
const authentificate = require("../../middlewars/authentificate");

const upload = multer();

const {
  getAllStreamers,
  addStreamer,
  getOneStreamer,
  updateVotesOfStreamer,
} = require("../../cntrls/streamers");
const { addStreamerSchema } = require("../../models/StreamerModel");
const { validateBody, validateId } = require("../../helpers");

router.get("/", authentificate, getAllStreamers);
router.post(
  "/",
  authentificate,
  upload.none(),
  validateBody(addStreamerSchema),
  addStreamer
);
router.get("/:streamerId", authentificate, validateId, getOneStreamer);
router.put(
  "/:streamerId/:vote",
  authentificate,
  validateId,
  updateVotesOfStreamer
);

module.exports = router;
