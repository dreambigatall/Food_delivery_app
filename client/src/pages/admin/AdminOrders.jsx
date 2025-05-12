"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchAllOrders, updateOrderStatus } from "../../api"
import { useAuth } from "../../contexts/AuthContext"
import { ORDER_STATUS } from "../../../config"

const AdminOrders = () => {
  const navigate = useNavigate()
  const { isAdmin, isAuthenticated } = useAuth()
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const { data: orders, isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: fetchAllOrders,
    enabled: isAuthenticated && isAdmin,
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] })
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
        <p>Loading orders...</p>
      </div>
    )
  }

  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate({ id: orderId, status: newStatus })
  }

  const filteredOrders = orders?.data.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter
    const matchesSearch =
      order._id.includes(searchTerm) ||
      (order.customer?.name && order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customer?.email && order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "all" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter(ORDER_STATUS.PENDING)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === ORDER_STATUS.PENDING
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter(ORDER_STATUS.PROCESSING)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === ORDER_STATUS.PROCESSING
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilter(ORDER_STATUS.OUT_FOR_DELIVERY)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === ORDER_STATUS.OUT_FOR_DELIVERY
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Out for Delivery
          </button>
          <button
            onClick={() => setFilter(ORDER_STATUS.DELIVERED)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === ORDER_STATUS.DELIVERED
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setFilter(ORDER_STATUS.CANCELLED)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === ORDER_STATUS.CANCELLED
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Cancelled
          </button>
        </div>
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                  Order Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
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
              {filteredOrders?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders?.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{order._id.substring(order._id.length - 6)}
                      </div>
                      <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer?.name || "N/A"}</div>
                      <div className="text-sm text-gray-500">{order.customer?.email || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{order.items.length} items</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {order.items.map((item) => `${item.quantity}x ${item.menuItem?.name || "Item"}`).join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === ORDER_STATUS.PENDING ? "bg-yellow-100 text-yellow-800" : ""}
                        ${order.status === ORDER_STATUS.PROCESSING ? "bg-blue-100 text-blue-800" : ""}
                        ${order.status === ORDER_STATUS.OUT_FOR_DELIVERY ? "bg-purple-100 text-purple-800" : ""}
                        ${order.status === ORDER_STATUS.DELIVERED ? "bg-green-100 text-green-800" : ""}
                        ${order.status === ORDER_STATUS.CANCELLED ? "bg-red-100 text-red-800" : ""}
                      `}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={
                          order.status === ORDER_STATUS.DELIVERED ||
                          order.status === ORDER_STATUS.CANCELLED ||
                          updateStatusMutation.isPending
                        }
                      >
                        <option value={ORDER_STATUS.PENDING}>Pending</option>
                        <option value={ORDER_STATUS.PROCESSING}>Processing</option>
                        <option value={ORDER_STATUS.OUT_FOR_DELIVERY}>Out for Delivery</option>
                        <option value={ORDER_STATUS.DELIVERED}>Delivered</option>
                        <option value={ORDER_STATUS.CANCELLED}>Cancelled</option>
                      </select>
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

export default AdminOrders
