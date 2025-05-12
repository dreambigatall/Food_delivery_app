**MERN Food Ordering App - Step-by-Step Documentation**

---

## 1. Introduction
A Food Ordering App allows customers to browse a menu, add items to their cart, place orders, and track real-time status updates, while administrators manage incoming orders. This guide details building a full-stack MERN (MongoDB, Express, React, Node.js) application with Socket.IO for real-time features.

---

## 2. Prerequisites
- **Development Environment**: Node.js (v16+), npm or Yarn, MongoDB Atlas or local installation
- **Familiarity**: JavaScript (ES6+), React, Node.js, Express, MongoDB
- **Tools**: Git, Postman (for API testing)

---

## 3. Project Setup

1. **Create Repositories**
   - `mern-food-order-backend`
   - `mern-food-order-frontend`

2. **Initialize Projects**
   ```bash
   # Backend
   mkdir mern-food-order-backend && cd mern-food-order-backend
   npm init -y

   # Frontend (in separate terminal)
   npx create-react-app mern-food-order-frontend
   ```

---

## 4. Folder Structure

```
mern-food-order-backend/
├── src/
│   ├── config/           # DB connection, environment
│   ├── controllers/       # Route handlers
│   ├── middleware/       # Auth, error handling
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routers
│   ├── utils/            # Helpers (e.g., socket events)
│   └── server.js         # Entry point
├── .env
└── package.json

mern-food-order-frontend/
├── public/
├── src/
│   ├── api/              # Axios instances, service functions
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context (Auth, Cart, Socket)
│   ├── pages/            # Screens (Menu, Cart, Orders, Admin)
│   ├── hooks/            # Custom hooks (useSocket, useAuth)
│   ├── App.js
│   ├── index.js
│   └── routes.js         # React Router setup
└── package.json
```

---

## 5. Environment Variables

Create a `.env` file in both root folders.

**Backend `.env`**:
```
PORT=5000
MONGODB_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>
```

**Frontend `.env`**:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 6. Backend Implementation

### 6.1. Install Dependencies
```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken socket.io
npm install --save-dev nodemon
```

### 6.2. server.js
```js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes(io));    // pass io for events

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// Start
connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 6.3. MongoDB Connection (`config/db.js`)
```js
const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};
```

### 6.4. Models
- **User** (`models/User.js`): name, email, passwordHash, role
- **MenuItem** (`models/MenuItem.js`): name, description, price, imageUrl, category
- **Order** (`models/Order.js`): customer, items, totalPrice, status, timestamps

*Define each using Mongoose schemas and export them.*

### 6.5. Auth (`routes/auth.js` & `controllers/auth.js`)
- **POST** `/register`: hash password, save user
- **POST** `/login`: verify password, return JWT
- Middleware: `auth.js` to protect routes, check `req.user.role` for admin

### 6.6. Menu CRUD (`routes/menu.js` & `controllers/menu.js`)
- **GET** `/`: list items
- **POST** `/` (admin): create
- **PUT** `/:id`, **DELETE** `/:id` (admin)

### 6.7. Orders & Cart
- **POST** `/cart` & **GET** `/cart` (optional: store cart in user doc or localStorage)
- **POST** `/orders`: create order, emit `newOrder` via Socket.IO
- **GET** `/orders`: list for customer
- **GET** `/orders/:id`: single order
- **PATCH** `/orders/:id/status` (admin): update status, emit `orderUpdated` to customer room

### 6.8. Socket.IO Events (`utils/socket.js`)
```js
module.exports = io => {
  io.on('connection', socket => {
    const { userId } = socket.handshake.query;
    socket.join(userId);  // room per user

    socket.on('disconnect', () => {
      socket.leave(userId);
    });
  });
};
```  
> Import and invoke in `server.js` before routes if you centralize events.

---

## 7. Frontend Implementation

### 7.1. Install Dependencies
```bash
npm install axios react-router-dom socket.io-client
```

### 7.2. API Service (`src/api/index.js`)
```js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const register = data => api.post('/auth/register', data);
export const login = data => api.post('/auth/login', data);
export const fetchMenu = () => api.get('/menu');
export const placeOrder = data => api.post('/orders', data);
// etc.

export default api;
```

### 7.3. Context Providers
- **AuthContext**: manage `user`, `token`, login/logout
- **CartContext**: `cartItems`, add/remove/update
- **SocketContext**:
  ```js
  import { io } from 'socket.io-client';
  const socket = io(process.env.REACT_APP_API_URL, { query: { userId: user.id } });
  ```

### 7.4. Pages & Components
- **MenuPage**: fetch and render `MenuItemCard`; handle add-to-cart
- **CartPage**: list items, modify quantities, checkout
- **OrderStatusPage**: subscribe to `orderUpdated`, display status timeline
- **AdminDashboard**: fetch all orders, status update buttons (calls patch)

### 7.5. Routing (`routes.js`)
```js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
// ...

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders/:id" element={<OrderStatusPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>
);
```

### 7.6. Real‑Time Hooks
```js
import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

export const useOrderUpdates = (onUpdate) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('orderUpdated', onUpdate);
    return () => socket.off('orderUpdated', onUpdate);
  }, [socket, onUpdate]);
};
```

---

## 8. Testing
- **Backend**: Use Postman or Jest + Supertest for endpoints
- **Frontend**: React Testing Library for component rendering and mocking API calls

---

## 9. Deployment
1. **Backend**
   - Create Heroku app, add `Procfile`:
     ```Procfile
     web: npm run start
     ```
   - Set config vars (MONGODB_URI, JWT_SECRET)
   - `git push heroku main`

2. **Frontend**
   - Build: `npm run build`
   - Deploy to Netlify or Vercel, set `REACT_APP_API_URL` env var to your Heroku URL

---

## 10. Additional Considerations
- **Security**: input validation, HTTPS, rate limiting
- **Performance**: pagination for menu & orders, image optimization
- **Scalability**: consider Redis for Socket.IO adapter in clustered environments
- **UX**: loading states, mobile responsive design, push notifications

---

*This completes your step-by-step MERN Food Ordering App documentation. Let me know if you’d like code samples, deeper dives into any section, or diagrams!*

