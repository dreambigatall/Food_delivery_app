// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Configure Multer Storage (Using Memory Storage)
const storage = multer.memoryStorage();

// File Filter Function (Optional but recommended)
const fileFilter = (req, file, cb) => {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // Accept file
  } else {
    cb(new Error('Error: Images Only! (jpeg, jpg, png, gif, webp)'), false); // Reject file
  }
};

// Initialize Multer Upload Middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size (e.g., 5MB)
  fileFilter: fileFilter,
});

module.exports = upload;