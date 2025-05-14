// "use client"

// import { useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useQuery } from "@tanstack/react-query"
// import { fetchAllOrders } from "../../api"
// import { useAuth } from "../../contexts/AuthContext"
// import { ORDER_STATUS } from "../../../config"

// const AdminDashboard = () => {
//   const navigate = useNavigate()
//   const { isAdmin, isAuthenticated } = useAuth()
//   const [orderStats, setOrderStats] = useState({
//     total: 0,
//     [ORDER_STATUS.PENDING]: 0,
//     [ORDER_STATUS.PROCESSING]: 0,
//     [ORDER_STATUS.OUT_FOR_DELIVERY]: 0,
//     [ORDER_STATUS.DELIVERED]: 0,
//     [ORDER_STATUS.CANCELLED]: 0,
//     revenue: 0,
//   })

//   const { data: orders, isLoading } = useQuery({
//     queryKey: ["adminOrders"],
//     queryFn: fetchAllOrders,
//     enabled: isAuthenticated && isAdmin,
//   })

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login")
//     } else if (!isAdmin) {
//       navigate("/")
//     }
//   }, [isAuthenticated, isAdmin, navigate])

//   useEffect(() => {
//     if (orders?.data) {
//       const stats = {
//         total: orders.data.length,
//         [ORDER_STATUS.PENDING]: 0,
//         [ORDER_STATUS.PROCESSING]: 0,
//         [ORDER_STATUS.OUT_FOR_DELIVERY]: 0,
//         [ORDER_STATUS.DELIVERED]: 0,
//         [ORDER_STATUS.CANCELLED]: 0,
//         revenue: 0,
//       }

//       orders.data.forEach((order) => {
//         stats[order.status] = (stats[order.status] || 0) + 1
//         if (order.status !== ORDER_STATUS.CANCELLED) {
//           stats.revenue += order.totalPrice
//         }
//       })

//       setOrderStats(stats)
//     }
//   }, [orders])

//   if (!isAuthenticated || !isAdmin) {
//     return null
//   }

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
//         <p>Loading dashboard data...</p>
//       </div>
//     )
//   }

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date)
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
//           <p className="text-3xl font-bold text-orange-600">{orderStats.total}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-2">Pending Orders</h2>
//           <p className="text-3xl font-bold text-yellow-600">{orderStats[ORDER_STATUS.PENDING]}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-2">Processing</h2>
//           <p className="text-3xl font-bold text-blue-600">{orderStats[ORDER_STATUS.PROCESSING]}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-2">Out for Delivery</h2>
//           <p className="text-3xl font-bold text-purple-600">{orderStats[ORDER_STATUS.OUT_FOR_DELIVERY]}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
//           <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
//           {orders?.data.length === 0 ? (
//             <p className="text-gray-600">No orders yet.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Order #
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Customer
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Status
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Total
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {orders?.data.slice(0, 5).map((order) => (
//                     <tr key={order._id}>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           #{order._id.substring(order._id.length - 6)}
//                         </div>
//                         <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{order.customer?.name || "N/A"}</div>
//                         <div className="text-sm text-gray-500">{order.customer?.email || "N/A"}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${order.status === ORDER_STATUS.PENDING ? "bg-yellow-100 text-yellow-800" : ""}
//                           ${order.status === ORDER_STATUS.PROCESSING ? "bg-blue-100 text-blue-800" : ""}
//                           ${order.status === ORDER_STATUS.OUT_FOR_DELIVERY ? "bg-purple-100 text-purple-800" : ""}
//                           ${order.status === ORDER_STATUS.DELIVERED ? "bg-green-100 text-green-800" : ""}
//                           ${order.status === ORDER_STATUS.CANCELLED ? "bg-red-100 text-red-800" : ""}
//                         `}
//                         >
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         ${order.totalPrice.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//           <div className="mt-4 text-right">
//             <Link to="/admin/orders" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
//               View all orders →
//             </Link>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-4">Revenue</h2>
//           <div className="text-center">
//             <p className="text-4xl font-bold text-orange-600">${orderStats.revenue.toFixed(2)}</p>
//             <p className="text-gray-600 mt-2">Total Revenue</p>
//           </div>
//           <div className="mt-6">
//             <h3 className="text-md font-medium mb-2">Order Status Breakdown</h3>
//             <div className="space-y-2">
//               <div>
//                 <div className="flex justify-between text-sm">
//                   <span>Delivered</span>
//                   <span>{orderStats[ORDER_STATUS.DELIVERED]} orders</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-green-600 h-2.5 rounded-full"
//                     style={{ width: `${(orderStats[ORDER_STATUS.DELIVERED] / orderStats.total) * 100 || 0}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between text-sm">
//                   <span>In Progress</span>
//                   <span>
//                     {orderStats[ORDER_STATUS.PENDING] +
//                       orderStats[ORDER_STATUS.PROCESSING] +
//                       orderStats[ORDER_STATUS.OUT_FOR_DELIVERY]}{" "}
//                     orders
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-blue-600 h-2.5 rounded-full"
//                     style={{
//                       width: `${
//                         (
//                           (orderStats[ORDER_STATUS.PENDING] +
//                             orderStats[ORDER_STATUS.PROCESSING] +
//                             orderStats[ORDER_STATUS.OUT_FOR_DELIVERY]) /
//                             orderStats.total
//                         ) * 100 || 0
//                       }%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between text-sm">
//                   <span>Cancelled</span>
//                   <span>{orderStats[ORDER_STATUS.CANCELLED]} orders</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-red-600 h-2.5 rounded-full"
//                     style={{ width: `${(orderStats[ORDER_STATUS.CANCELLED] / orderStats.total) * 100 || 0}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard

"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query" // Import useQueryClient
import { fetchAllOrders } from "../../api" // Assuming this is your API fetch function
import { useAuth } from "../../contexts/AuthContext"
import { ORDER_STATUS } from "../../../config" // Your order status constants
import io from 'socket.io-client' // Import socket.io-client

// --- Notification Component (Optional, for better UI) ---
// const NotificationToast = ({ message, type = "info", onClose }) => {
//   const baseClasses = "fixed top-5 right-5 p-4 rounded-md shadow-lg text-white z-50"
//   const typeClasses = {
//     info: "bg-blue-500",
//     success: "bg-green-500",
//     error: "bg-red-500",
//   }
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose()
//     }, 5000) // Auto-close after 5 seconds
//     return () => clearTimeout(timer)
//   }, [onClose])

//   return (
//     <div className={`${baseClasses} ${typeClasses[type]}`}>
//       <button onClick={onClose} className="absolute top-1 right-2 text-lg font-bold">×</button>
//       {message}
//     </div>
//   )
// }
const NotificationToast = ({ message, type = "info", onClose }) => {
  const baseClasses = "fixed top-5 right-5 p-4 rounded-md shadow-lg text-white z-50 transition-opacity duration-300"
  const typeClasses = {
    info: "bg-blue-500",
    success: "bg-green-500",
    error: "bg-red-500",
  }
  const [isVisible, setIsVisible] = useState(true); // State for visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);      // Sets internal visibility to false
      setTimeout(onClose, 300); // Call onClose (passed from AdminDashboard) AFTER fade out animation duration
    }, 5000) // Auto-close logic starts after 5 seconds
    return () => clearTimeout(timer)
  }, [onClose]) // Dependency array includes onClose

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300);}} className="absolute top-1 right-2 text-lg font-bold">×</button>
      {message}
    </div>
  )
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { isAdmin, isAuthenticated, user } = useAuth() // Assuming user object has token or you get it differently
  const queryClient = useQueryClient() // For react-query cache updates

  const [orderStats, setOrderStats] = useState({
    total: 0,
    [ORDER_STATUS.PENDING]: 0,
    [ORDER_STATUS.PROCESSING]: 0,
    [ORDER_STATUS.OUT_FOR_DELIVERY]: 0,
    [ORDER_STATUS.DELIVERED]: 0,
    [ORDER_STATUS.CANCELLED]: 0,
    revenue: 0,
  })

  const [liveNotification, setLiveNotification] = useState(null) // For displaying toast

  const { data: ordersResponse, isLoading, error } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: fetchAllOrders,
    enabled: isAuthenticated && isAdmin,
  })
  const orders = ordersResponse?.data // Assuming your fetchAllOrders returns { data: [...] }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    } else if (!isAdmin) {
      navigate("/")
    }
  }, [isAuthenticated, isAdmin, navigate])

  useEffect(() => {
    if (orders) { // Check if orders is defined
      const stats = {
        total: orders.length,
        [ORDER_STATUS.PENDING]: 0,
        [ORDER_STATUS.PROCESSING]: 0,
        [ORDER_STATUS.OUT_FOR_DELIVERY]: 0,
        [ORDER_STATUS.DELIVERED]: 0,
        [ORDER_STATUS.CANCELLED]: 0,
        revenue: 0,
      }

      orders.forEach((order) => {
        stats[order.status] = (stats[order.status] || 0) + 1
        if (order.status !== ORDER_STATUS.CANCELLED) {
          stats.revenue += order.totalPrice
        }
      })

      setOrderStats(stats)
    }
  }, [orders])


  // --- Socket.IO Integration ---
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    console.log("AdminDashboard: Retrieved token for Socket.IO:", authToken);
    if (!isAuthenticated || !isAdmin || !authToken) {
      // Don't connect if not authenticated admin or no token
      return
    }

    const socket = io('https://food-delivery-app-abcw.onrender.com', {
      auth: {
        token: authToken // Get token from your auth context or localStorage
      },
      // You might need to add withCredentials if your server requires cookies,
      // and transports if there are firewall issues (though default is usually fine)
      // transports: ['websocket', 'polling'],
    })

    socket.on('connect', () => {
      console.log('Admin connected to WebSocket server:', socket.id)
    })

    socket.on('new_order_notification', (data) => {
      console.log('New Order Notification Received:', data)
      setLiveNotification({ message: data.message, type: "success" })

      // Option 1: Refetch all orders to update the list and stats
      queryClient.invalidateQueries(["adminOrders"])

      // Option 2: Manually update the cache (more complex, but can be more performant)
      // This would involve using queryClient.setQueryData to add the new order
      // to the existing 'adminOrders' cache. This requires the 'data' payload
      // from the socket event to be the full new order object or enough details.
      // Example (if `data` is the full new order object from backend):
      /*
      queryClient.setQueryData(['adminOrders'], (oldData) => {
        if (oldData && oldData.data) {
          // Check if order already exists to prevent duplicates if refetch also happens
          const orderExists = oldData.data.some(order => order._id === data.orderId);
          if (!orderExists) {
             // You'd need the full order object in 'data' from the socket event
             // or at least enough to display it.
             // For simplicity, the backend currently sends:
             // { orderId, customerName, totalPrice, message }
             // So to add to the table, you'd need more details in the socket payload,
             // or stick to refetching.
             // If data was { newOrder: {...full order object...} }:
             // return { ...oldData, data: [data.newOrder, ...oldData.data] };
          }
        }
        return oldData;
      });
      */
    })

    socket.on('connect_error', (err) => {
      console.error('WebSocket Connection Error (Admin):', err.message)
      if (err.data) console.error('Connection Error Data:', err.data) // Additional error details
      setLiveNotification({ message: `WebSocket connection error: ${err.message}`, type: "error"})
    })

    socket.on('disconnect', (reason) => {
      console.log('Admin disconnected from WebSocket:', reason)
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    })

    // Cleanup on component unmount
    return () => {
      console.log('Disconnecting admin socket...')
      socket.disconnect()
    }
  }, [isAuthenticated, isAdmin, user?.token, queryClient]) // Add dependencies

  // --- End Socket.IO Integration ---


  if (!isAuthenticated || !isAdmin) {
    // This check is already at the top, but good for clarity before render
    return null
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p>Loading dashboard data...</p>
      </div>
    )
  }

  if (error) { // Handle error from useQuery
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-red-500">Error loading orders: {error.message}</p>
      </div>
    )
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
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
      
      {liveNotification && (
        <>
        
        <NotificationToast
          message={liveNotification.message}
          type={liveNotification.type}
          onClose={() => setLiveNotification(null)}
        />
      </>)}
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards - No changes needed here unless you want them to update live without full refetch */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold text-orange-600">{orderStats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Pending Orders</h2>
          <p className="text-3xl font-bold text-yellow-600">{orderStats[ORDER_STATUS.PENDING]}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Processing</h2>
          <p className="text-3xl font-bold text-blue-600">{orderStats[ORDER_STATUS.PROCESSING]}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Out for Delivery</h2>
          <p className="text-3xl font-bold text-purple-600">{orderStats[ORDER_STATUS.OUT_FOR_DELIVERY]}</p>
        </div>
      </div>

      {/* Recent Orders and Revenue - Table will update if `orders` data changes due to refetch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          {(!orders || orders.length === 0) ? ( // Check if orders array is empty or undefined
            <p className="text-gray-600">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order #
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
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.slice(0, 5).map((order) => ( // Ensure orders is not undefined before slicing
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {/* Ensure order._id exists before substring */}
                          #{order._id ? order._id.substring(order._id.length - 6) : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customer?.name || "N/A"}</div>
                        <div className="text-sm text-gray-500">{order.customer?.email || "N/A"}</div>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 text-right">
            <Link to="/admin/orders" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
              View all orders →
            </Link>
          </div>
        </div>

        {/* Revenue and Status Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue</h2>
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-600">${orderStats.revenue.toFixed(2)}</p>
            <p className="text-gray-600 mt-2">Total Revenue</p>
          </div>
          <div className="mt-6">
            <h3 className="text-md font-medium mb-2">Order Status Breakdown</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Delivered</span>
                  <span>{orderStats[ORDER_STATUS.DELIVERED]} orders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${(orderStats[ORDER_STATUS.DELIVERED] / (orderStats.total || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>In Progress</span>
                  <span>
                    {orderStats[ORDER_STATUS.PENDING] +
                      orderStats[ORDER_STATUS.PROCESSING] +
                      orderStats[ORDER_STATUS.OUT_FOR_DELIVERY]}{" "}
                    orders
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (
                          (orderStats[ORDER_STATUS.PENDING] +
                            orderStats[ORDER_STATUS.PROCESSING] +
                            orderStats[ORDER_STATUS.OUT_FOR_DELIVERY]) /
                            (orderStats.total || 1) // Avoid division by zero
                        ) * 100 
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Cancelled</span>
                  <span>{orderStats[ORDER_STATUS.CANCELLED]} orders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{ width: `${(orderStats[ORDER_STATUS.CANCELLED] / (orderStats.total || 1)) * 100 }%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
