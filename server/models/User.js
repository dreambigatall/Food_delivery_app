// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique
    trim: true,
    lowercase: true, // Stores email in lowercase for consistency
    // Basic email format validation (more robust validation might be done at the application level)
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  passwordHash: {
    type: String,
    required: true,
    // Password hashing should be handled before saving, not stored in plain text
  },
  role: {
    type: String,
    required: true,
    enum: ['customer', 'admin'], // Defines allowed roles
    default: 'customer', // Default role for new users
  },
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true,
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;