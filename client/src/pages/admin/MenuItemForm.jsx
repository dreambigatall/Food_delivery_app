"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchMenuItem, createMenuItem, updateMenuItem } from "../../api"
import { useAuth } from "../../contexts/AuthContext"
const MenuItemForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAdmin, isAuthenticated } = useAuth()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [error, setError] = useState("")

  // Fetch menu item data if in edit mode
  const { data: menuItem, isLoading: isLoadingMenuItem } = useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => fetchMenuItem(id),
    enabled: isEditMode,
    onSuccess: (response) => {
      const item = response.data
      setFormData({
        name: item.name,
        description: item.description || "",
        price: item.price.toString(),
        category: item.category,
      })
      setImagePreview(item.imageUrl || "")
    },
  })

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] })
      navigate("/admin/menu")
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Failed to create menu item")
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data) => updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] })
      queryClient.invalidateQueries({ queryKey: ["menuItem", id] })
      navigate("/admin/menu")
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Failed to update menu item")
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    } else if (!isAdmin) {
      navigate("/")
    }
  }, [isAuthenticated, isAdmin, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!formData.name || !formData.price || !formData.category) {
      setError("Please fill in all required fields")
      return
    }

    // Create FormData object for file upload
    const submitData = new FormData()
    submitData.append("name", formData.name)
    submitData.append("description", formData.description)
    submitData.append("price", Number.parseFloat(formData.price))
    submitData.append("category", formData.category)

    if (imageFile) {
      submitData.append("image", imageFile)
    }

    if (isEditMode) {
      updateMutation.mutate(submitData)
    } else {
      createMutation.mutate(submitData)
    }
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  if (isEditMode && isLoadingMenuItem) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p>Loading menu item data...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{isEditMode ? "Edit Menu Item" : "Add New Menu Item"}</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image {!isEditMode && <span className="text-red-500">*</span>}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required={!isEditMode}
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-40 object-cover rounded" />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/menu")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-orange-400"
          >
            {createMutation.isPending || updateMutation.isPending
              ? "Saving..."
              : isEditMode
                ? "Update Item"
                : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MenuItemForm
