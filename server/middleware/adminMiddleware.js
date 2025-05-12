// middleware/adminMiddleware.js

const admin = (req, res, next) => {
    // Assumes 'protect' middleware has already run and attached req.user
    if (req.user && req.user.role === 'admin') {
      next(); // User is an admin, proceed
    } else {
      res.status(403); // Forbidden
      throw new Error('Not authorized as an admin');
    }
  };
  
  module.exports = { admin };