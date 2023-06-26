const { Streamer } = require("../models/StreamerModel");
const { errorCatcher } = require("../helpers");

const getOneStreamer = async (req, res) => {
  const id = req.params.streamerId;
  const data = await Streamer.findById(id);
  if (data) {
    res.status(200).json(data);
  } else {
    throw HttpError(404, "Not found");
  }
};

module.exports = {
  getOneStreamer: errorCatcher(getOneStreamer),
};
