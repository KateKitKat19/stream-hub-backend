const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set user name"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
    },
    voted: {
      upvoted: [{ type: Schema.Types.ObjectId, ref: "Streamer" }],
      downvoted: [{ type: Schema.Types.ObjectId, ref: "Streamer" }],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleError);

const registerSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required name field`;
            break;
          case "string.min":
            err.message = `Name should have at least ${err.local.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .required()
    .min(5)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required password field`;
            break;
          case "string.min":
            err.message = `Name should have at least ${err.local.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  email: Joi.string()
    .required()
    .email()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required email field`;
            break;
          case "string.email":
            err.message = `Value is not a valid e-mail`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const signinSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(5).required(),
});

const User = model("users", userSchema);

module.exports = {
  registerSchema,
  signinSchema,
  userSchema,
  User,
};
