// models/MenuItem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false, // Description might be optional
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'], // Ensure price is not negative
  },
  imageUrl: {
    type: String,
    required: false, // Image might be optional or added later
    trim: true,
  },
  imagePublicId: { // To store the Cloudinary public_id for management
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    // You might want to use an enum here if categories are fixed, e.g.:
    // enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side']
  },
}, {
  timestamps: true,
});

// Create and export the MenuItem model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;