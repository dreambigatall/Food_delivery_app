// routes/userRoutes.js
const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    getUsers,       // For admin
    getUserById,    // For admin
} = require('../controllers/userController'); // Adjust path if needed
const { protect} = require('../middleware/authMiddleware'); // Adjust path if needed
const {admin} = require('../middleware/adminMiddleware');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validationMiddleware'); // Adjust path if needed

const router = express.Router();
console.log('Imported getUsers:', getUsers); // Check the console output when server starts
console.log('Imported protect:', protect); // Check this output
console.log('Imported admin:', admin); 

// --- Public Routes ---
router.post(
    '/register',
    [ // Validation middleware for registration
        body('name', 'Name is required').not().isEmpty().trim(),
        body('email', 'Please include a valid email').isEmail().normalizeEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        // Optional: Validate role if you allow it during registration
        // body('role').optional().isIn(['customer', 'admin'])
    ],
    validateRequest, // Checks for validation errors
    registerUser
);

router.post(
    '/login',
    [ // Validation middleware for login
        body('email', 'Please include a valid email').isEmail().normalizeEmail(),
        body('password', 'Password cannot be empty').not().isEmpty(),
    ],
    validateRequest, // Checks for validation errors
    loginUser
);

// --- Private Routes (Require Authentication) ---
router.get(
    '/profile',
    protect, // Requires user to be logged in
    getUserProfile
);

// --- Admin Routes (Require Authentication + Admin Role) ---
router.get(
    '/', // GET /api/users
    protect,
    admin,
    getUsers
);

router.get(
    '/:id', // GET /api/users/:id
    protect,
    admin,
    getUserById
);

// Add PUT/DELETE routes for admins to manage users if needed
// router.put('/:id', protect, admin, updateUser); // Requires an updateUser controller function
// router.delete('/:id', protect, admin, deleteUser); // Requires a deleteUser controller function


module.exports = router;