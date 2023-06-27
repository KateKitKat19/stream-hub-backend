const { Streamer } = require("../../models/StreamerModel");
const { User } = require("../../models/UserModel");
const { errorCatcher, HttpError } = require("../../helpers");

const updateVotesOfStreamer = async (req, res, next) => {
  const streamerId = req.params.streamerId;
  const vote = req.params.vote;
  const { _id: userId } = req.user;

  const user = await User.findById(userId);
  const streamer = await Streamer.findById(streamerId);

  if (!user) {
    next(HttpError(404, "Not found"));
  }

  // check if this streamer is already voted for
  const isUpvoted = user.voted?.upvoted.find(
    (id) => id.toString() === streamerId
  );
  const isDownvoted = user.voted?.downvoted.find(
    (id) => id.toString() === streamerId
  );

  try {
    //if it`s already upvoted and we click upvote
    if (vote === "upvote") {
      if (isUpvoted) {
        user.voted.upvoted = user.voted.upvoted.filter(
          (streamer) => streamer.toString() !== streamerId
        );
        streamer.upvotes = streamer.upvotes - 1;

        //if it`s downvoted and we click upvote
      } else if (isDownvoted) {
        user.voted.upvoted.push(streamerId);
        streamer.upvotes = streamer.upvotes + 1;

        user.voted.downvoted = user.voted.downvoted.filter(
          (streamer) => streamer.toString() !== streamerId
        );
        streamer.downvotes = streamer.downvotes - 1;

        //if it`s not voted yet and we click upvote
      } else {
        user.voted.upvoted.push(streamerId);
        streamer.upvotes = streamer.upvotes + 1;
      }
    } else if (vote === "downvote") {
      //if it`s upvoted and we click downvote
      if (isUpvoted) {
        user.voted.upvoted = user.voted.upvoted.filter(
          (streamer) => streamer.toString() !== streamerId
        );
        streamer.upvotes = streamer.upvotes - 1;

        user.voted.downvoted.push(streamerId);
        streamer.downvotes = streamer.downvotes + 1;

        //if it`s downvoted and we click downvote
      } else if (isDownvoted) {
        user.voted.downvoted = user.voted.downvoted.filter(
          (streamer) => streamer.toString() !== streamerId
        );
        streamer.downvotes = streamer.downvotes - 1;

        //if it`s not voted yet and we click downvote
      } else {
        user.voted.downvoted.push(streamerId);
        streamer.downvotes = streamer.downvotes + 1;
      }
    }
    const updatedData = await streamer.save();
    await user.save();
    res.status(200).json({ status: 200, data: updatedData });
  } catch (error) {
    console.log(error.message);
    next(HttpError(404, "Not found"));
  }
};

module.exports = {
  updateVotesOfStreamer: errorCatcher(updateVotesOfStreamer),
};
