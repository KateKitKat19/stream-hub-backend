const { isValidObjectId } = require("mongoose");
const  HttpError  = require("./HttpError");

function validateId(req, res, next) {
  const id = req.params.streamerId;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid!`));
  }
  next();
}

module.exports = validateId;
