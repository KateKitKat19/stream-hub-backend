const handleError = (error, data, next) => {
  const { name, code } = error;
  const notUnique = name === "MongoServerError" && code === 11000;
  error.status = notUnique ? 409 : 400;
  next();
};

module.exports = handleError;