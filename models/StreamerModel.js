const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");

const streamerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

streamerSchema.post("save", handleError);

const Streamer = model("streamers", streamerSchema);

module.exports = {
  streamerSchema,
  Streamer,
};
