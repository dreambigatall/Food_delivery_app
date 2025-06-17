
```
# FoodOrder App

A full-stack food delivery application built with the MERN stack, designed to provide a seamless experience for users to browse menus, place orders, and track their deliveries, similar to DoorDash.

## Features

*   **User Authentication:** Secure user registration, login, and logout functionalities.
*   **Dynamic Menu Browsing:** Explore a wide variety of dishes with categories and search capabilities.
*   **Detailed Dish View:** View individual dish details, including descriptions and pricing.
*   **Shopping Cart Management:** Add, update quantities, and remove items from your cart.
*   **Order Summary & Checkout:** Transparent breakdown of costs (subtotal, delivery fee, tax) and a streamlined checkout process with "Pay on Delivery" option.
*   **Order History:** View past and pending orders with unique order IDs, status, and details.
*   **Order Tracking:** (Implied by "Track Order" button) Functionality to monitor the status of active orders.
*   **Responsive Design:** (Assumed) User-friendly interface across various devices.

## Technologies Used

*   **Frontend:** React.js
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js) or Yarn
*   MongoDB (local installation or cloud service like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```
2.  **Install backend dependencies:**
    ```bash
    cd backend # or server, depending on your project structure
    npm install
    # or yarn install
    ```
3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend # or client, depending on your project structure
    npm install
    # or yarn install
    ```
4.  **Configure Environment Variables:**
    Create a `.env` file in your `backend` (or `server`) directory and add your MongoDB URI and any other necessary environment variables (e.g., `PORT`, `JWT_SECRET`).
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    ```
5.  **Run the application:**
    *   **Start the backend server:**
        ```bash
        cd backend
        npm start # or node server.js
        ```
    *   **Start the frontend development server:**
        ```bash
        cd frontend
        npm start
        ```

The frontend application should now be running on `http://localhost:3000` (or another port if configured).





```
![Screenshot 2025-06-17 213501](https://github.com/user-attachments/assets/c75ea8d7-4ece-4130-b239-dd93d8bc7d9c)
![Screenshot 2025-06-17 213702](https://github.com/user-attachments/assets/7d5e9ec2-23f4-4995-8047-7a5f2f92f421)
![Screenshot 2025-06-17 213743](https://github.com/user-attachments/assets/551c3b7d-5e65-4ffd-bcf6-ab5f49e5e9ec)
![Screenshot 2025-06-17 213822](https://github.com/user-attachments/assets/0498a540-b619-4f9f-936c-f5797d45e7c3)
![Screenshot 2025-06-17 213844](https://github.com/user-attachments/assets/466c054a-4022-48d7-97a8-bbfef96460e9)
