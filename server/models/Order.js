// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a sub-schema for items within an order
const orderItemSchema = new Schema({
  menuItem: {
    type: Schema.Types.ObjectId,
    ref: 'MenuItem', // Reference to the MenuItem model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'], // Ensure quantity is positive
  },
  // Optional: Store price at the time of order to handle price changes
  // priceAtOrder: {
  //   type: Number,
  //   required: true,
  // }
}, { _id: false }); // Prevent Mongoose from creating a separate _id for subdocuments

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (customer placing the order)
    required: true,
  },
  items: {
    type: [orderItemSchema], // Array of order items using the sub-schema
    required: true,
    validate: [val => val.length > 0, 'Order must contain at least one item'] // Ensure items array is not empty
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price cannot be negative'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending', // Default status when an order is placed
  },
  // Optional: Add fields like delivery address, payment details reference, etc.
  // deliveryAddress: {
  //   street: String,
  //   city: String,
  //   postalCode: String,
  //   country: String,
  // },
  // paymentIntentId: String, // Example: Stripe Payment Intent ID

}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true,
});

// Create and export the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;