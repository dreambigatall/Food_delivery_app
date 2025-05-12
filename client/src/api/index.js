import authService from "./services/authService"
import menuService from "./services/menuService"
import orderService from "./services/orderService"

// Export all services
export const { registerUser, loginUser, getUserProfile, getAllUsers, getUserById } = authService

export const { fetchMenuItems, fetchMenuItem, createMenuItem, updateMenuItem, deleteMenuItem } = menuService

export const { createOrder, fetchMyOrders, fetchOrder, fetchAllOrders, updateOrderStatus } = orderService

export default {
  ...authService,
  ...menuService,
  ...orderService,
}
