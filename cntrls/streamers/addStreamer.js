
const { Streamer } = require("../../models/StreamerModel");
const { errorCatcher } = require("../../helpers");

const DEF_IMAGE_URL =
  "https://drive.google.com/file/d/1o6FQcFCT-xQE7Fz7gVpjiXxwrkgpZv96/view?usp=sharing";

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
