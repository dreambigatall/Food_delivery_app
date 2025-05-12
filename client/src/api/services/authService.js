import api from "../axiosConfig"

// User authentication services
export const registerUser = (userData) => api.post("/users/register", userData)

export const loginUser = (credentials) => api.post("/users/login", credentials)

export const getUserProfile = () => api.get("/users/profile")

export const getAllUsers = () => api.get("/users")

export const getUserById = (id) => api.get(`/users/${id}`)

export default {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  getUserById,
}
