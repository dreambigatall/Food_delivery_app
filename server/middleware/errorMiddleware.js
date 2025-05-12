// middleware/errorMiddleware.js

// Handles routes that are not found (404)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next error handler
};

// General error handler
const errorHandler = (err, req, res, next) => {
  // Sometimes errors come with a status code, otherwise default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Include stack trace only in development mode for debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };