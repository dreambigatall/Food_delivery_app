//import { ORDER_STATUS } from "../config"
import { ORDER_STATUS } from "../../config"
const OrderStatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return "bg-yellow-100 text-yellow-800"
      case ORDER_STATUS.PROCESSING:
        return "bg-blue-100 text-blue-800"
      case ORDER_STATUS.OUT_FOR_DELIVERY:
        return "bg-purple-100 text-purple-800"
      case ORDER_STATUS.DELIVERED:
        return "bg-green-100 text-green-800"
      case ORDER_STATUS.CANCELLED:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>{status}</span>
}

export default OrderStatusBadge
