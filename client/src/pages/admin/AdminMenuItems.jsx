"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchMenuItems, deleteMenuItem } from "../../api"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

const AdminMenuItems = () => {
  const navigate = useNavigate()
  const { isAdmin, isAuthenticated } = useAuth()
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [categories, setCategories] = useState([])

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ["menuItems"],
    queryFn: async () => {
      const response = await fetchMenuItems()
      return response.data
    },
  })

  // Extract unique categories from menu items
  useEffect(() => {
    if (menuItems) {
      const uniqueCategories = [...new Set(menuItems.map((item) => item.category))]
      setCategories(uniqueCategories)
    }
  }, [menuItems])

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] })
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    } else if (!isAdmin) {
      navigate("/")
    }
  }, [isAuthenticated, isAdmin, navigate])

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p>Loading menu items...</p>
      </div>
    )
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      deleteMutation.mutate(id)
    }
  }

  const filteredItems = menuItems?.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Menu Items</h1>
        <Link to="/admin/menu/new" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
          Add New Item
        </Link>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              categoryFilter === "all" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                categoryFilter === category ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No menu items found
                  </td>
                </tr>
              ) : (
                filteredItems?.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg"
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to={`/admin/menu/edit/${item._id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending && deleteMutation.variables === item._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminMenuItems
