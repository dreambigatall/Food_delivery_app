// middleware/validationMiddleware.js
const { validationResult } = require('express-validator');

// Middleware to check for validation errors collected by express-validator
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return a 400 response with the errors
    return res.status(400).json({ errors: errors.array() });
  }
  // If no errors, proceed to the next middleware or route handler
  next();
};

module.exports = { validateRequest };