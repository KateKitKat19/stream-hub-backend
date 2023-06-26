const { Streamer } = require("../models/StreamerModel");
const { errorCatcher } = require("../helpers");
const { HttpError } = require("../helpers");

const updateVotesOfStreamer = async (req, res) => {
  const id = req.params.streamerId;
  const vote = req.params.vote;
  const streamer = await Streamer.findById(id);
  if (!streamer) throw HttpError(404, "Not found");
  const update =
    vote === "upvote"
      ? { upvotes: Number(streamer.upvotes) + 1 }
      : { downvotes: Number(streamer.downvotes) + 1 };

  const updatedData = await Streamer.findByIdAndUpdate(id, update, {
    new: true,
  });

  if (!updatedData) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ status: 200, data: updatedData });
};

module.exports = {
  updateVotesOfStreamer: errorCatcher(updateVotesOfStreamer),
};
