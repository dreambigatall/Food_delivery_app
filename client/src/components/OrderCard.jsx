import { Link } from "react-router-dom"
import OrderStatusBadge from "./OrderStatusBadge"

const OrderCard = ({ order }) => {
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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Order #{order._id.substring(order._id.length - 6)}</h3>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-600">Placed on: {formatDate(order.createdAt)}</p>
        <p className="text-sm text-gray-600">Items: {order.items.length}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
        <Link
          to={`/track/${order._id}`}
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm"
        >
          Track Order
        </Link>
      </div>
    </div>
  )
}

export default OrderCard
