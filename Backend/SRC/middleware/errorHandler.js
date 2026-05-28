const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ Success: false, Message: err.message });
};
module.exports = errorHandler;
