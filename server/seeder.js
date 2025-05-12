// seeder.js (or scripts/seedAdmin.js)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Adjust path to your DB connection file
const User = require('./models/User');    // Adjust path to your User model

// Load env vars
dotenv.config({ path: './.env' }); // Specify path to your .env file

// --- Configuration ---
// You can set these directly or ideally read from process arguments or a secure source
const ADMIN_EMAIL = process.env.INITIAL_ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.INITIAL_ADMIN_NAME || 'Admin User';
// --- End Configuration ---

const seedAdmin = async () => {
    try {
        await connectDB(); // Connect to the database

        // Check if admin already exists
        const adminExists = await User.findOne({ email: ADMIN_EMAIL });
        if (adminExists) {
            console.log(`Admin user with email ${ADMIN_EMAIL} already exists.`);
            process.exit();
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

        // Create admin user object
        const adminUser = new User({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            passwordHash: passwordHash,
            role: 'admin', // Explicitly set the role
        });

        // Save the admin user
        await adminUser.save();

        console.log(`Admin user ${ADMIN_NAME} (${ADMIN_EMAIL}) created successfully!`);
        process.exit(); // Exit script after success

    } catch (error) {
        console.error(`Error seeding admin user: ${error.message}`);
        process.exit(1); // Exit with error code
    } finally {
         // Ensure disconnection even if error happens before exit (optional)
         await mongoose.disconnect();
         console.log('Database disconnected.');
    }
};

// Run the seeder function
seedAdmin();