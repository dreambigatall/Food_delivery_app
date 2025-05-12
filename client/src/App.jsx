import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { CartProvider } from "./contexts/CartContext"
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./contexts/AuthContext"
import { NotificationProvider } from "./contexts/NotificationContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import MenuPage from "./pages/MenuPage"
import ItemDetailPage from "./pages/ItemDetailPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import OrdersPage from "./pages/OrdersPage"
import OrderTrackingPage from "./pages/OrderTrackingPage"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminMenuItems from "./pages/admin/AdminMenuItems"
import MenuItemForm from "./pages/admin/MenuItemForm"
//import { Toaster } from 'sonner'; // Import the Toaster component
import { Toaster } from "@/components/ui/sonner"
// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/menu/:id" element={<ItemDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/orders/:id" element={<OrderDetailsPage />} />
                  <Route path="/track/:orderId" element={<OrderTrackingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/menu" element={<AdminMenuItems />} />
                  <Route path="/admin/menu/new" element={<MenuItemForm />} />
                  <Route path="/admin/menu/edit/:id" element={<MenuItemForm />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
          <Toaster />
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
