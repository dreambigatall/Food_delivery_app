// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // Utility to handle async errors
const User = require('../models/User'); // Adjust path as needed

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGciOiJI...")
      token = req.headers.authorization.split(' ')[1];

      // Verify token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is in your .env file

      // Get user from the token payload (usually contains user ID)
      // Attach user object to the request, excluding the password
      req.user = await User.findById(decoded.id).select('-passwordHash');

      if (!req.user) {
         res.status(401);
         throw new Error('Not authorized, user not found');
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401); // Unauthorized
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };