// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2; // Use v2 for modern features
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Optional: Ensures HTTPS URLs are generated
});

console.log('Cloudinary Configured'); // Optional: Confirmation log

module.exports = cloudinary;