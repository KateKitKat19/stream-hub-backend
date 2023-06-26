const { Streamer } = require("../../models/StreamerModel");
const { User } = require("../../models/UserModel");
const { errorCatcher, HttpError } = require("../../helpers");

const updateVotesOfStreamer = async (req, res, next) => {
  const streamerId = req.params.streamerId;
  const vote = req.params.vote;
  const { _id: userId } = req.user;

  const user = await User.findById(userId);
  if (!user) {
    next(HttpError(404, "Not found"));
  }
  const isUpvoted = user.voted?.upvoted.find(
    (id) => id.toString() === streamerId
  );
  const isDownvoted = user.voted?.downvoted.find(
    (id) => id.toString() === streamerId
  );

  try {
    if (vote === "upvote") {
      if (isUpvoted) {
        user.voted.upvoted = user.voted.upvoted.filter(
          (streamer) => streamer.toString() !== streamerId
        );
      } else if (isDownvoted) {
        user.voted.upvoted.push(streamerId);
        user.voted.downvoted = user.voted.downvoted.filter(
          (streamer) => streamer.toString() !== streamerId
        );
      } else {
        user.voted.upvoted.push(streamerId);
      }
    } else if (vote === "downvote") {
      if (isUpvoted) {
        user.voted.upvoted = user.voted.upvoted.filter(
          (streamer) => streamer.toString() !== streamerId
        );
        user.voted.downvoted.push(streamerId);
      } else if (isDownvoted) {
        user.voted.downvoted = user.voted.downvoted.filter(
          (streamer) => streamer.toString() !== streamerId
        );
      } else {
        user.voted.downvoted.push(streamerId);
      }
    }
    const updatedData = await user.save();
    res.status(200).json({ status: 200, data: updatedData });
  } catch (error) {
    console.log(error.message);
    next(HttpError(404, "Not found"));
  }
};

module.exports = {
  updateVotesOfStreamer: errorCatcher(updateVotesOfStreamer),
};
