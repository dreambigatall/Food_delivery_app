// const dotenv = require("dotenv");
// const mongoDB = require("./config/db");
// const app = require("./app");
// dotenv.config();

// console.log("1")
// mongoDB();
// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });


// server.js
const dotenv = require("dotenv");
dotenv.config(); // Load .env variables first

const mongoDB = require("./config/db");
const { app, server: httpServer, io } = require("./app"); // Import app, server, and io from app.js

console.log("Server.js: Starting application setup...");

// Connect to MongoDB
mongoDB();

const PORT = process.env.PORT || 3000; // Use environment variable for port or default to 3000

// Start the HTTP server (which includes Express app and Socket.IO)
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Express app is listening for HTTP requests.`);
    console.log(`Socket.IO is initialized and listening for WebSocket connections.`);
    // You can log the io instance details if needed for debugging
    // console.log("Socket.IO instance:", io.path());
});

// Optional: Graceful shutdown and error handling for the server process
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
    // Add any other cleanup here, e.g., close DB connection if necessary
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
  // Consider a more robust shutdown mechanism for production
  httpServer.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Application specific logging, throwing an error, or other logic here
  // Consider a more robust shutdown mechanism for production
  httpServer.close(() => {
    process.exit(1);
  });
});