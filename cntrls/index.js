const { getAllStreamers } = require("./getAllStreamers");
const { addStreamer } = require("./addStreamer");
const { getOneStreamer } = require("./getOneStreamer");
const { updateVotesOfStreamer } = require("./updateVotesOfStreamer");

module.exports = {
  getAllStreamers,
  addStreamer,
  getOneStreamer,
  updateVotesOfStreamer,
};
