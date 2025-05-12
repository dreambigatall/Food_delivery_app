// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// // const AppError = require('./utils/AppError')
// const AppError = require('./utils/AppError')
// // const globalErrorHandler = require('./controllers/errorController')
// const globalErrorHandler = require('./controllers/errorController')
// const userRoutes = require('./routes/userRoutes')
// const menuItemRoutes = require('./routes/menuItemRoutes');
// const orderRoutes = require('./routes/orderRoutes');

// const app = express();

// console.log("2")

// app.use(cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Your frontend URL
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], // Include OPTIONS explicitly
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
//   }));

// console.log("3")

// //app.options('*', cors());
// app.use(express.static(path.join(__dirname, 'public')));

// console.log("4")

// app.use(express.json());

// console.log("5")
// app.get('/', (req, res) => {
//     res.send('API is running');
//   });

// app.use('/api/users', userRoutes);
// app.use('/api/menu', menuItemRoutes);
// app.use('/api/orders', orderRoutes);

// // app.all('*', (req, res, next) => {
// //     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// //   });
//   console.log("6")
//   // Global error handler
//   app.use(globalErrorHandler);
//   console.log("7")
// module.exports = app;

// app.js
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const http = require('http'); // Required for Socket.IO
// const { Server } = require("socket.io"); // Socket.IO Server class
// const jwt = require('jsonwebtoken'); // To verify tokens for socket authentication
// const User = require('./models/User'); // Adjust path as necessary for User model

// const AppError = require('./utils/AppError'); // Assuming this is your custom error class
// const globalErrorHandler = require('./controllers/errorController'); // Your global error handler

// const userRoutes = require('./routes/userRoutes');
// const menuItemRoutes = require('./routes/menuItemRoutes');
// const orderRoutes = require('./routes/orderRoutes');

// const app = express();
// console.log('1')
// // --- Create HTTP server for Express and Socket.IO ---
// const server = http.createServer(app); // Create HTTP server from Express app

// // --- Configure Socket.IO ---
// const io = new Server(server, {
//     cors: {
//         origin: process.env.FRONTEND_URL || "http://localhost:5173", // Your frontend URL
//         methods: ["GET", "POST"], // Standard methods for Socket.IO
//         credentials: true
//     }
// });

// // Make io accessible to your routes/controllers via req.app.get('io')
// app.set('io', io);
// console.log('2')
// // --- Socket.IO Authentication Middleware ---
// io.use(async (socket, next) => {
//     const token = socket.handshake.auth.token; // Client should send token in auth object
//     if (!token) {
//         console.log("Socket Auth: No token provided");
//         return next(new AppError('Authentication error: No token provided for WebSocket', 401));
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         socket.userId = decoded.id; // Attach userId to the socket object

//         // Fetch user role to determine if admin
//         const user = await User.findById(decoded.id).select('role');
//         if (!user) {
//             console.log("Socket Auth: User not found for token ID");
//             return next(new AppError('Authentication error: User not found', 401));
//         }
//         socket.userRole = user.role; // Attach userRole to the socket object

//         console.log(`Socket authenticated: User ${socket.userId}, Role: ${socket.userRole}`);
//         next();
//     } catch (err) {
//         console.error("Socket Auth Error:", err.message);
//         if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
//             return next(new AppError('Authentication error: Invalid or expired token', 401));
//         }
//         return next(new AppError('Authentication error', 401)); // Generic auth error
//     }
// });
// console.log('3')
// // --- Socket.IO Connection Handling ---
// // Store connected users/sockets (simple in-memory store)
// // For production with multiple server instances, consider a shared store like Redis
// const connectedUsers = {}; // { userId: socketId } (optional if mainly using rooms)

// io.on('connection', (socket) => {
//     console.log(`Socket Connected: ${socket.id}, UserID: ${socket.userId}, Role: ${socket.userRole}`);

//     // Store the mapping (optional)
//     connectedUsers[socket.userId] = socket.id;

//     // Join user-specific room (good for targeting specific users)
//     socket.join(`user_room_${socket.userId}`);
//     console.log(`User ${socket.userId} (socket ${socket.id}) joined room user_room_${socket.userId}`);

//     // If the connected user is an admin, add them to an admin notification room
//     if (socket.userRole === 'admin') {
//         socket.join('admin_notifications_room');
//         console.log(`Admin User ${socket.userId} (socket ${socket.id}) joined admin_notifications_room.`);
//     }

//     socket.on('disconnect', () => {
//         console.log(`Socket Disconnected: ${socket.id}, UserID: ${socket.userId}`);
//         delete connectedUsers[socket.userId];
//         // Socket.IO automatically handles leaving rooms on disconnect
//     });

//     // You can add more custom server-side socket event listeners here if needed
//     // e.g., socket.on('some_custom_event_from_client', (data) => { /* ... */ });
// });

// console.log('4')
// // --- Express Middleware ---
// app.use(cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Added X-Requested-With
//     credentials: true
// }));

// // Handle OPTIONS requests for all routes (important for CORS preflight)
// // app.options('*', cors({
// //     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
// //     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
// //     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
// //     credentials: true
// // }));
// console.log('5')

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json()); // Middleware to parse JSON bodies

// // --- API Routes ---
// app.get('/', (req, res) => {
//     res.send('API is running with Socket.IO...');
// });
// console.log('6')
// app.use('/api/users', userRoutes);
// app.use('/api/menu', menuItemRoutes);
// app.use('/api/orders', orderRoutes);

// // --- Catch 404 and forward to error handler ---
// // This should be after all your routes
// // app.all('*', (req, res, next) => {
// //     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// // });
// console.log('7')
// // --- Global Error Handling Middleware ---
// // This should be the last middleware
// app.use(globalErrorHandler);

// module.exports = { app, server, io }; // Export app, server, and io

// app.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require('http');
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const userRoutes = require('./routes/userRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
console.log('App.js: Initializing...');

// --- Create HTTP server for Express and Socket.IO ---
const server = http.createServer(app);

// --- Configure Socket.IO ---
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.set('io', io);
console.log('App.js: Socket.IO configured and set.');

// --- Socket.IO Authentication Middleware ---
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    console.log("Socket Auth: No token provided");
    return next(new AppError('Authentication error: No token provided for WebSocket', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    const user = await User.findById(decoded.id).select('role');
    if (!user) {
      console.log("Socket Auth: User not found for token ID");
      return next(new AppError('Authentication error: User not found', 401));
    }
    socket.userRole = user.role;
    console.log(`Socket authenticated: User ${socket.userId}, Role: ${socket.userRole}`);
    next();
  } catch (err) {
    console.error("Socket Auth Error:", err.message);
    return next(new AppError('Authentication error: Invalid or expired token', 401));
  }
});
console.log('App.js: Socket.IO authentication middleware set.');

// --- Socket.IO Connection Handling ---
const connectedUsers = {};
io.on('connection', (socket) => {
  console.log(`Socket Connected: ${socket.id}, UserID: ${socket.userId}, Role: ${socket.userRole}`);
  connectedUsers[socket.userId] = socket.id;
  socket.join(`user_room_${socket.userId}`);
  console.log(`User ${socket.userId} joined room user_room_${socket.userId}`);
  if (socket.userRole === 'admin') {
    socket.join('admin_notifications');
    console.log(`Admin User ${socket.userId} joined admin_notifications.`);
  }
  socket.on('disconnect', () => {
    console.log(`Socket Disconnected: ${socket.id}, UserID: ${socket.userId}`);
    delete connectedUsers[socket.userId];
  });
});
console.log('App.js: Socket.IO connection handler set.');

// --- Express Middleware ---

// 1. Enable CORS (automatically handles OPTIONS)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));
console.log('App.js: CORS middleware set.');

// 2. Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// 3. Parse JSON request bodies
app.use(express.json());
console.log('App.js: Static file and JSON parsing middleware set.');

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('API is running with Socket.IO...');
});

app.use('/api/users', userRoutes);
app.use('/api/menu',  menuItemRoutes);
app.use('/api/orders', orderRoutes);
console.log('App.js: API routes mounted.');

// --- Global Error Handling Middleware ---
// (No explicit 404 catcher here; let your error controller handle unknown routes if needed)
app.use(globalErrorHandler);
console.log('App.js: Global error handler set.');

module.exports = { app, server, io };
console.log('App.js: Module exports configured.');
