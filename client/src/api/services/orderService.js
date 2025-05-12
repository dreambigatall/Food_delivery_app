import api from "../axiosConfig"

// Order services
export const createOrder = (orderData) => api.post("/orders", orderData)

export const fetchMyOrders = () => api.get("/orders/myorders")

export const fetchOrder = (id) => api.get(`/orders/${id}`)

export const fetchAllOrders = () => api.get("/orders")

export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status })

export default {
  createOrder,
  fetchMyOrders,
  fetchOrder,
  fetchAllOrders,
  updateOrderStatus,
}
