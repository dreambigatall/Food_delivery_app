"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchMyOrders } from "../api"
import { useAuth } from "../contexts/AuthContext"
import OrderCard from "../components/OrderCard"

const OrdersPage = () => {
  const { isAuthenticated, user } = useAuth()

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: fetchMyOrders,
    enabled: isAuthenticated,
  })

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-600 mb-4">Please log in to view your orders.</p>
        <a href="/login" className="px-6 py-3 bg-orange-600 text-white font-medium rounded hover:bg-orange-700">
          Login
        </a>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p>Loading your orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-red-600">Error loading orders. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {orders?.data.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <a href="/menu" className="px-6 py-3 bg-orange-600 text-white font-medium rounded hover:bg-orange-700">
            Browse Menu
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders?.data.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage
