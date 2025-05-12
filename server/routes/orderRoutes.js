// routes/orderRoutes.js
const express = require('express');
const {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,       // For admin
    updateOrderStatus,  // For admin
} = require('../controllers/orderController'); // Adjust path if needed
const { protect } = require('../middleware/authMiddleware'); // Adjust path if needed
const {admin}  = require('../middleware/adminMiddleware')
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validationMiddleware'); // Adjust path if needed

const router = express.Router();

// --- Private Routes (Require Authentication) ---
router.post(
    '/', // POST /api/orders
    protect, // Only logged-in users can create orders
    [ // Validation for creating an order
      body('items', 'Order must contain items').isArray({ min: 1 }),
      body('items.*.menuItem', 'Each item must have a menuItem ID').isMongoId(), // Check if it's a valid MongoDB ObjectId
      body('items.*.quantity', 'Each item must have a quantity greater than 0').isInt({ gt: 0 }),
      // Optional: Validate deliveryAddress if you add it
      // body('deliveryAddress.street', 'Street is required').if(body('deliveryAddress').exists()).notEmpty(),
      // body('deliveryAddress.city', 'City is required').if(body('deliveryAddress').exists()).notEmpty(),
      // ... etc
    ],
    validateRequest,
    createOrder
);

router.get(
    '/myorders', // GET /api/orders/myorders
    protect, // User needs to be logged in to see their orders
    getMyOrders
);

router.get(
    '/:id', // GET /api/orders/:id
    protect, // User needs to be logged in (authorization check inside controller)
    getOrderById
);


// --- Admin Routes (Require Authentication + Admin Role) ---
router.get(
    '/', // GET /api/orders (Get all orders)
    protect,
    admin,
    getAllOrders
);

router.put(
    '/:id/status', // PUT /api/orders/:id/status (Update order status)
    protect,
    admin,
    [ // Validation for status update
        body('status', 'Status is required').not().isEmpty().trim()
          .isIn(['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'])
          .withMessage('Invalid status value'),
    ],
    validateRequest,
    updateOrderStatus
);

module.exports = router;