const { Streamer } = require("../../models/StreamerModel");
const { errorCatcher } = require("../../helpers");

const DEF_IMAGE_URL = "https://i.ibb.co/9qjsqX3/avatar-of-streamer.png";

const addStreamer = async (req, res) => {
  const newStreamer = await Streamer.create({
    ...req.body,
    image: DEF_IMAGE_URL,
    upvotes: 0,
    downvotes: 0,
  });
  res.status(201).json({ status: 201, data: newStreamer });
};

module.exports = {
  addStreamer: errorCatcher(addStreamer),
};
