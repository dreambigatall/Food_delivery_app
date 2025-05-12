import api from "../axiosConfig"

// Menu item services
export const fetchMenuItems = (category = null) => {
  const url = category ? `/menu?category=${category}` : "/menu"
  return api.get(url)
}

export const fetchMenuItem = (id) => api.get(`/menu/${id}`)

export const createMenuItem = (formData) => {
  return api.post("/menu", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export const updateMenuItem = (id, formData) => {
  return api.put(`/menu/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export const deleteMenuItem = (id) => api.delete(`/menu/${id}`)

export default {
  fetchMenuItems,
  fetchMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
}
