// routes/menuItemRoutes.js
const express = require('express');
const {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuItemController'); // Adjust path if needed
const { protect } = require('../middleware/authMiddleware'); // Adjust path if needed
const { admin } = require('../middleware/adminMiddleware');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validationMiddleware'); // Adjust path if needed
const upload = require('../middleware/uploadMiddleware'); // Multer Middlewer 

const router = express.Router();

// --- Public Routes ---
router.get('/', getMenuItems); // GET /api/menu
router.get('/:id', getMenuItemById); // GET /api/menu/:id

// --- Admin Routes (Require Authentication + Admin Role) ---
router.post(
    '/', // POST /api/menu
    protect,
    admin,
    upload.single('image'),    
    [ // Validation for creating menu item
        body('name', 'Name is required').not().isEmpty().trim(),
        body('price', 'Price must be a positive number').isFloat({ gt: 0 }),
        body('category', 'Category is required').not().isEmpty().trim(),
        body('description').optional().trim(),
        body('imageUrl').optional().isURL().withMessage('Image URL must be a valid URL').trim(),
    ],
    validateRequest,
    createMenuItem
);

router.put(
    '/:id', // PUT /api/menu/:id
    protect,
    admin,
    upload.single('image'),  
     [ // Optional validation for updating (similar to create, but fields aren't strictly required)
        body('name').optional().not().isEmpty().trim(),
        body('price').optional().isFloat({ gt: 0 }),
        body('category').optional().not().isEmpty().trim(),
        body('description').optional().trim(),
        body('imageUrl').optional().isURL().withMessage('Image URL must be a valid URL').trim(),
     ],
    validateRequest,
    updateMenuItem
);

router.delete(
    '/:id', // DELETE /api/menu/:id
    protect,
    admin,
    deleteMenuItem
);

module.exports = router;