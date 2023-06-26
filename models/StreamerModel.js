const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");
const Joi = require("joi");

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
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    downvotes: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

streamerSchema.post("save", handleError);

const addStreamerSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(20)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required name field`;
            break;
          case "string.min":
            err.message = `Name should have at least ${err.local.limit} characters!`;
            break;
          case "string.max":
            err.message = `Name should have at most ${err.local.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  platform: Joi.string()
    .required()
    .valid("Twitch", "YouTube", "TikTok", "Kick", "Rumble")
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required platform field`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  description: Joi.string()
    .required()
    .min(3)
    .max(500)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required description field`;
            break;
          case "string.min":
            err.message = `Description should have at least ${err.local.limit} characters!`;
            break;
          case "string.max":
            err.message = `Description should have at most ${err.local.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const Streamer = model("streamers", streamerSchema);

module.exports = {
  streamerSchema,
  addStreamerSchema,
  Streamer,
};
