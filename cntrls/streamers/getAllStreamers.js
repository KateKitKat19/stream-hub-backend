const { Streamer } = require("../../models/StreamerModel");
const { errorCatcher } = require("../../helpers");

const getAllStreamers = async (req, res) => {
  const result = await Streamer.find();
  res.json(result);
};

module.exports = {
  getAllStreamers: errorCatcher(getAllStreamers),
};
