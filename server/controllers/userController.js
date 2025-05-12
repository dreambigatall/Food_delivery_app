// controllers/userController.js
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path as necessary

// --- Utility Function ---
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body)

    // Basic validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all required fields (name, email, password)');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        passwordHash,
        role: role || 'customer', // Default to 'customer' if role not provided or invalid
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id), // Send token back upon registration
        });
        console.log("user registerded successfully",user)
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("loginUser",req.body)
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    // Check for user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
        console.log("user login successfully",user)
    } else {
        res.status(401); // Unauthorized
        throw new Error('Invalid email or password');
    }
});

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private (requires token)
const getUserProfile = asyncHandler(async (req, res) => {
    // req.user is attached by the 'protect' middleware
    const user = req.user;

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// --- Optional Admin Functions ---

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-passwordHash'); // Exclude passwords
    res.json(users);
});

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getUsers,      // Export if needed for admin panel
    getUserById,   // Export if needed for admin panel
};