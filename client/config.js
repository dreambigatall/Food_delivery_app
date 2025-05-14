// Configuration file for the application
export const API_URL = import.meta.env.VITE_API_URL || 'https://food-delivery-app-abcw.onrender.com/api' 

// Match backend order status values
export const ORDER_STATUS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
}

export const SOCKET_EVENTS = {
  ORDER_UPDATED: "order_updated",
  NEW_ORDER: "new_order",
}
