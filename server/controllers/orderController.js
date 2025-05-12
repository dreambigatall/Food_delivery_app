// controllers/orderController.js
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order'); // Adjust path as necessary
const MenuItem = require('../models/MenuItem'); // Need this to verify item prices

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Customer or Admin)
// const createOrder = asyncHandler(async (req, res) => {
//     const { items } = req.body; // Expect items = [{ menuItem: 'itemId', quantity: N }, ...]

//     if (!items || items.length === 0) {
//         res.status(400);
//         throw new Error('No order items provided');
//     }
//   console.log("1")
//     // --- Security Measure: Get prices from DB, not client ---
//     let calculatedTotalPrice = 0;
//     const orderItems = [];

//     for (const item of items) {
//         if (!item.menuItem || !item.quantity || item.quantity <= 0) {
//             res.status(400);
//             throw new Error(`Invalid data for item: ${JSON.stringify(item)}`);
//         }

//         const menuItemDetails = await MenuItem.findById(item.menuItem).select('price');
//         if (!menuItemDetails) {
//             res.status(404);
//             throw new Error(`Menu item not found: ID ${item.menuItem}`);
//         }

//         // Add to total price
//         calculatedTotalPrice += menuItemDetails.price * item.quantity;
//       console.log("2")
//         // Add item details to be saved in the order
//         orderItems.push({
//             menuItem: item.menuItem, // Store the ObjectId
//             quantity: item.quantity,
//             // priceAtOrder: menuItemDetails.price // Optional: Store price at time of order
//         });
//     }
//     // --- End Security Measure ---

//     // Create the order object
//     const order = new Order({
//         customer: req.user._id, // Get logged-in user ID from 'protect' middleware
//         items: orderItems,
//         totalPrice: calculatedTotalPrice,
//         status: 'Pending', // Default status
//         // Optional: Add deliveryAddress if sent in req.body
//         // deliveryAddress: req.body.deliveryAddress
//     });

//     const createdOrder = await order.save();

//     // Populate menu item details before sending back (optional but good UX)
//     const populatedOrder = await Order.findById(createdOrder._id)
//                                        .populate('customer', 'name email')
//                                        .populate('items.menuItem', 'name price'); // Populate item details

//     res.status(201).json(populatedOrder);
// });

const createOrder = asyncHandler(async (req, res) => {
    const { items } = req.body;
    const io = req.app.get('io'); // Get Socket.IO instance

    if (!items || items.length === 0) {
        res.status(400);
        throw new Error('No order items provided');
    }

    let calculatedTotalPrice = 0;
    const orderItems = [];

    for (const item of items) {
        // ... (your existing item validation and price calculation)
        if (!item.menuItem || !item.quantity || item.quantity <= 0) {
            res.status(400);
            throw new Error(`Invalid data for item: ${JSON.stringify(item)}`);
        }
        const menuItemDetails = await MenuItem.findById(item.menuItem).select('price name'); // Get name too
        if (!menuItemDetails) {
            res.status(404);
            throw new Error(`Menu item not found: ID ${item.menuItem}`);
        }
        calculatedTotalPrice += menuItemDetails.price * item.quantity;
        orderItems.push({
            menuItem: item.menuItem,
            quantity: item.quantity,
        });
    }

    const order = new Order({
        customer: req.user._id,
        items: orderItems,
        totalPrice: calculatedTotalPrice,
        status: 'Pending',
    });

    const createdOrder = await order.save();

    const populatedOrder = await Order.findById(createdOrder._id)
                                       .populate('customer', 'name email')
                                       .populate('items.menuItem', 'name price');

    // --- Emit notification to admins ---
    if (io && populatedOrder) {
        const notificationData = {
            orderId: populatedOrder._id,
            customerName: populatedOrder.customer.name,
            totalPrice: populatedOrder.totalPrice,
            message: `New order #${populatedOrder._id.toString().slice(-6)} from ${populatedOrder.customer.name}.`
        };
        io.to('admin_notifications').emit('new_order_notification', notificationData);
        console.log('Emitted new_order_notification to admin_notifications room', notificationData);
    }
    // --- End Notification ---

    res.status(201).json(populatedOrder);
});

// @desc    Get orders for the logged-in user
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ customer: req.user._id })
                              .populate('customer', 'name email') // Optional: good practice
                              .populate('items.menuItem', 'name price imageUrl') // Populate details within items array
                              .sort({ createdAt: -1 }); // Show newest first
    res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (Customer who owns it or Admin)
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
                             .populate('customer', 'name email')
                             .populate('items.menuItem', 'name price imageUrl');

    if (order) {
        // Check if the logged-in user is the customer OR an admin
        if (order.customer._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
            res.json(order);
        } else {
            res.status(403); // Forbidden
            throw new Error('Not authorized to view this order');
        }
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
                              .populate('customer', 'id name email') // Populate basic customer info
                              .populate('items.menuItem', 'name') // Populate basic item info
                              .sort({ createdAt: -1 });
    res.json(orders);
});

// @desc    Update order status (e.g., to Processing, Delivered)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
// const updateOrderStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body;
//     const order = await Order.findById(req.params.id);

//     // Basic validation for allowed statuses
//     const allowedStatuses = ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'];
//     if (!allowedStatuses.includes(status)) {
//         res.status(400);
//         throw new Error(`Invalid status: ${status}`);
//     }

//     if (order) {
//         order.status = status;
//         // Potentially add logic here, e.g., setting a deliveredAt timestamp if status === 'Delivered'
//         const updatedOrder = await order.save();

//         // Optional: Populate details before sending response
//         const populatedOrder = await Order.findById(updatedOrder._id)
//                                           .populate('customer', 'name email')
//                                           .populate('items.menuItem', 'name price');

//         res.json(populatedOrder);
//     } else {
//         res.status(404);
//         throw new Error('Order not found');
//     }
// });
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const orderId = req.params.id;
    const io = req.app.get('io'); // Get Socket.IO instance

    const order = await Order.findById(orderId).populate('customer', '_id name'); // Ensure customer ID is populated

    const allowedStatuses = ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
        res.status(400);
        throw new Error(`Invalid status: ${status}`);
    }

    if (order) {
        order.status = status;
        const updatedOrder = await order.save();

        const populatedOrder = await Order.findById(updatedOrder._id)
                                          .populate('customer', 'name email')
                                          .populate('items.menuItem', 'name price');

        // --- Emit notification to the specific customer ---
        if (io && populatedOrder && populatedOrder.customer) {
            const customerId = populatedOrder.customer._id.toString();
            const customerRoom = `user_room_${customerId}`;
            const notificationData = {
                orderId: populatedOrder._id,
                status: populatedOrder.status,
                message: `Your order #${populatedOrder._id.toString().slice(-6)} has been updated to: ${populatedOrder.status}.`
            };
            io.to(customerRoom).emit('order_status_update', notificationData);
            console.log(`Emitted order_status_update to room ${customerRoom}`, notificationData);
        }
        // --- End Notification ---

        res.json(populatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});


module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,        // Export for admin use
    updateOrderStatus,   // Export for admin use
};