// "use client"

// import { useEffect, useState } from "react"
// import { useParams, Link } from "react-router-dom"
// import { useQuery } from "@tanstack/react-query"
// import { fetchOrder } from "../api"
// import { io } from "socket.io-client"
// import { API_URL, SOCKET_EVENTS, ORDER_STATUS } from "../../config"
// import OrderStatusBadge from "../components/OrderStatusBadge"

// const OrderTrackingPage = () => {
//   const { orderId } = useParams()
//   const [orderStatus, setOrderStatus] = useState(null)

//   const {
//     data: order,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["order", orderId],
//     queryFn: () => fetchOrder(orderId),
//     onSuccess: (data) => {
//       setOrderStatus(data.data.status)
//     },
//   })

//   useEffect(() => {
//     const socket = io(API_URL)

//     socket.on("connect", () => {
//       console.log("Connected to socket server")
//       socket.emit("join", `order_${orderId}`)
//     })

//     socket.on(SOCKET_EVENTS.ORDER_UPDATED, (data) => {
//       if (data.orderId === orderId) {
//         setOrderStatus(data.status)
//       }
//     })

//     return () => {
//       socket.disconnect()
//     }
//   }, [orderId])

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
//         <p>Loading order details...</p>
//       </div>
//     )
//   }

//   if (error || !order) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
//         <p className="text-red-600">Error loading order details. Please try again.</p>
//         <Link to="/orders" className="mt-4 inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
//           Back to Orders
//         </Link>
//       </div>
//     )
//   }

//   const orderData = order.data

//   const getStatusStep = (status) => {
//     switch (status) {
//       case ORDER_STATUS.PENDING:
//         return 0
//       case ORDER_STATUS.PROCESSING:
//         return 1
//       case ORDER_STATUS.OUT_FOR_DELIVERY:
//         return 2
//       case ORDER_STATUS.DELIVERED:
//         return 3
//       case ORDER_STATUS.CANCELLED:
//         return -1
//       default:
//         return 0
//     }
//   }

//   const currentStep = getStatusStep(orderStatus)

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
//       <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-xl font-semibold">Order #{orderData._id.substring(orderData._id.length - 6)}</h2>
//             <p className="text-gray-600">Placed on {formatDate(orderData.createdAt)}</p>
//           </div>
//           <OrderStatusBadge status={orderStatus || orderData.status} />
//         </div>

//         <div className="mb-8">
//           <div className="relative">
//             <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
//               {currentStep >= 0 && (
//                 <div
//                   style={{ width: `${Math.min(100, (currentStep / 3) * 100)}%` }}
//                   className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-600"
//                 ></div>
//               )}
//             </div>
//             <div className="flex justify-between">
//               <div className={`text-center ${currentStep >= 0 ? "text-orange-600 font-medium" : "text-gray-500"}`}>
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 0 ? "bg-orange-600 text-white" : "bg-gray-200"}`}
//                 >
//                   1
//                 </div>
//                 <div className="text-xs mt-1">Confirmed</div>
//               </div>
//               <div className={`text-center ${currentStep >= 1 ? "text-orange-600 font-medium" : "text-gray-500"}`}>
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-orange-600 text-white" : "bg-gray-200"}`}
//                 >
//                   2
//                 </div>
//                 <div className="text-xs mt-1">Preparing</div>
//               </div>
//               <div className={`text-center ${currentStep >= 2 ? "text-orange-600 font-medium" : "text-gray-500"}`}>
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-orange-600 text-white" : "bg-gray-200"}`}
//                 >
//                   3
//                 </div>
//                 <div className="text-xs mt-1">On the way</div>
//               </div>
//               <div className={`text-center ${currentStep >= 3 ? "text-orange-600 font-medium" : "text-gray-500"}`}>
//                 <div
//                   className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-orange-600 text-white" : "bg-gray-200"}`}
//                 >
//                   4
//                 </div>
//                 <div className="text-xs mt-1">Delivered</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mb-6">
//           <h3 className="font-semibold mb-2">Customer Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-600">Name</p>
//               <p>{orderData.customer?.name || "N/A"}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Email</p>
//               <p>{orderData.customer?.email || "N/A"}</p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="font-semibold mb-2">Order Details</h3>
//           <div className="border rounded-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Item
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Quantity
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Price
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {orderData.items.map((item, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{item.menuItem?.name || "Item"}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{item.quantity}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
//                       ${((item.menuItem?.price || 0) * item.quantity).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot className="bg-gray-50">
//                 <tr>
//                   <td colSpan="2" className="px-6 py-3 text-right text-sm font-bold">
//                     Total
//                   </td>
//                   <td className="px-6 py-3 text-right text-sm font-bold">${orderData.totalPrice.toFixed(2)}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OrderTrackingPage

"use client"

import { useEffect, useState } from "react"
import { useParams, Link as RouterLink } from "react-router-dom" // Renamed Link to avoid conflict
import { useQuery } from "@tanstack/react-query"
import { fetchOrder } from "../api" // Assuming this is correct
import { io } from "socket.io-client"
import { API_URL, SOCKET_EVENTS, ORDER_STATUS } from "../../config" // Make sure paths are correct

// Shadcn/ui components (or adapt if using something else)
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge" // For a more standard badge

// Lucide Icons
import {
  Loader2,
  AlertTriangle,
  Package,
  CookingPot,
  Bike,
  Home,
  CheckCircle2,
  XCircle,
  ChevronRight,
  CalendarDays,
  Hash,
  User,
  Mail,
  ShoppingBag,
} from "lucide-react"

// Assuming OrderStatusBadge is a custom component. If not, we can use shadcn's Badge.
// Let's create a more integrated status display.
const getStatusAppearance = (status) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return { text: "Pending", color: "bg-yellow-500 hover:bg-yellow-500", icon: <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> }
    case ORDER_STATUS.PROCESSING:
      return { text: "Processing", color: "bg-blue-500 hover:bg-blue-500", icon: <CookingPot className="h-4 w-4 mr-1.5" /> }
    case ORDER_STATUS.OUT_FOR_DELIVERY:
      return { text: "Out for Delivery", color: "bg-orange-500 hover:bg-orange-500", icon: <Bike className="h-4 w-4 mr-1.5" /> }
    case ORDER_STATUS.DELIVERED:
      return { text: "Delivered", color: "bg-green-600 hover:bg-green-600", icon: <CheckCircle2 className="h-4 w-4 mr-1.5" /> }
    case ORDER_STATUS.CANCELLED:
      return { text: "Cancelled", color: "bg-red-600 hover:bg-red-600", icon: <XCircle className="h-4 w-4 mr-1.5" /> }
    default:
      return { text: "Unknown", color: "bg-gray-500 hover:bg-gray-500", icon: <Package className="h-4 w-4 mr-1.5" /> }
  }
}


const OrderTrackingPage = () => {
  const { orderId } = useParams()
  const [currentOrderStatus, setCurrentOrderStatus] = useState(null) // Renamed for clarity

  const {
    data: orderDataResponse, // Renamed to avoid conflict with orderData variable later
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
    onSuccess: (data) => {
      if (data?.data?.status) {
        setCurrentOrderStatus(data.data.status)
      }
    },
    refetchOnWindowFocus: true, // Good for tracking pages
  })

  useEffect(() => {
    // Set initial status from query if not already set by onSuccess
    if (orderDataResponse?.data?.status && !currentOrderStatus) {
        setCurrentOrderStatus(orderDataResponse.data.status);
    }

    const socket = io(API_URL, {
        transports: ['websocket'], // Explicitly use websockets for better reliability
        reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("Connected to socket server for order tracking");
      socket.emit("join", `order_${orderId}`);
    });

    socket.on(SOCKET_EVENTS.ORDER_UPDATED, (data) => {
      if (data.orderId === orderId) {
        console.log("Order updated via socket:", data);
        setCurrentOrderStatus(data.status);
      }
    });

    socket.on("disconnect", (reason) => {
        console.log("Disconnected from socket server:", reason);
    });

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
    });

    return () => {
      console.log("Disconnecting socket for order tracking");
      socket.off(SOCKET_EVENTS.ORDER_UPDATED); // Remove specific listener
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [orderId, orderDataResponse, currentOrderStatus]); // Added currentOrderStatus to dependencies

  const orderData = orderDataResponse?.data

  // --- Status Steps Definition ---
  const statusSteps = [
    { name: "Order Confirmed", description: "We've received your order.", icon: Package, statusMatcher: [ORDER_STATUS.PENDING, ORDER_STATUS.PROCESSING, ORDER_STATUS.OUT_FOR_DELIVERY, ORDER_STATUS.DELIVERED] },
    { name: "Preparing Your Meal", description: "The kitchen is working on it!", icon: CookingPot, statusMatcher: [ORDER_STATUS.PROCESSING, ORDER_STATUS.OUT_FOR_DELIVERY, ORDER_STATUS.DELIVERED] },
    { name: "Out for Delivery", description: "Your order is on its way.", icon: Bike, statusMatcher: [ORDER_STATUS.OUT_FOR_DELIVERY, ORDER_STATUS.DELIVERED] },
    { name: "Delivered", description: "Enjoy your meal!", icon: Home, statusMatcher: [ORDER_STATUS.DELIVERED] },
  ]

  const getActiveStepIndex = (status) => {
    if (status === ORDER_STATUS.DELIVERED) return statusSteps.length -1;
    if (status === ORDER_STATUS.OUT_FOR_DELIVERY) return 2;
    if (status === ORDER_STATUS.PROCESSING) return 1;
    if (status === ORDER_STATUS.PENDING) return 0;
    return -1; // For cancelled or unknown
  }

  const activeStepIndex = getActiveStepIndex(currentOrderStatus || orderData?.status)

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">Loading Order Details...</h2>
        <p className="text-muted-foreground">Please wait a moment.</p>
      </div>
    )
  }

  // --- Error State ---
  if (error || !orderData) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-2xl font-semibold text-destructive-foreground mb-2">
          {error ? "Failed to Load Order" : "Order Not Found"}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          {error ? `An error occurred: ${error.message}.` : "We couldn't find the details for this order."}
          Please check the order ID or try again later.
        </p>
        <Button asChild>
          <RouterLink to="/orders">
            <ChevronRight className="h-4 w-4 mr-2 rotate-180" /> Back to My Orders
          </RouterLink>
        </Button>
      </div>
    )
  }

  const finalOrderStatus = currentOrderStatus || orderData.status
  const appearance = getStatusAppearance(finalOrderStatus)

  // --- Main Content ---
  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Order Tracking
            </h1>
            <Badge variant="outline" className={`text-sm px-3 py-1.5 border-0 text-white ${appearance.color}`}>
                {appearance.icon} {appearance.text}
            </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center">
                <Hash className="h-4 w-4 mr-1.5"/>
                Order ID: <span className="font-medium text-foreground ml-1">...{orderData._id.slice(-6)}</span>
            </div>
            <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5"/>
                Placed: <span className="font-medium text-foreground ml-1">{formatDate(orderData.createdAt)}</span>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Timeline / Main Info */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>
                {finalOrderStatus === ORDER_STATUS.DELIVERED
                  ? "Your Order Has Been Delivered!"
                  : finalOrderStatus === ORDER_STATUS.CANCELLED
                  ? "This Order Has Been Cancelled"
                  : "Order Progress"}
              </CardTitle>
              {finalOrderStatus !== ORDER_STATUS.DELIVERED && finalOrderStatus !== ORDER_STATUS.CANCELLED &&
                <CardDescription>
                    Estimated Delivery: <span className="font-medium text-primary">{orderData.estimatedDeliveryTime || "Today"}</span> {/* Add this to your API if possible */}
                </CardDescription>
              }
            </CardHeader>
            <CardContent className="p-6">
              {finalOrderStatus === ORDER_STATUS.CANCELLED ? (
                <div className="flex flex-col items-center text-center py-8">
                  <XCircle className="h-20 w-20 text-destructive mb-6" />
                  <p className="text-xl font-medium text-foreground mb-2">Order Cancelled</p>
                  <p className="text-muted-foreground max-w-sm">
                    {orderData.cancellationReason || "This order was cancelled. If you have questions, please contact support."}
                  </p>
                  <Button variant="outline" className="mt-6" asChild>
                    <RouterLink to="/contact-support">Contact Support</RouterLink>
                  </Button>
                </div>
              ) : finalOrderStatus === ORDER_STATUS.DELIVERED ? (
                 <div className="flex flex-col items-center text-center py-8">
                    <CheckCircle2 className="h-20 w-20 text-green-600 mb-6" />
                    <p className="text-xl font-medium text-foreground mb-2">Thank you for your order!</p>
                    <p className="text-muted-foreground max-w-sm">
                        We hope you enjoyed your meal. Feel free to leave a review or order again soon.
                    </p>
                    <div className="flex gap-3 mt-6">
                        <Button variant="outline" asChild>
                            <RouterLink to={`/review/${orderData._id}`}>Leave a Review</RouterLink>
                        </Button>
                        <Button asChild>
                            <RouterLink to="/menu">Order Again</RouterLink>
                        </Button>
                    </div>
                </div>
              ) : (
                <div className="relative pl-2">
                  {/* Vertical Line */}
                  <div className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-border -z-10" />

                  {statusSteps.map((step, index) => {
                    const Icon = step.icon
                    const isCompleted = activeStepIndex >= index
                    const isActive = activeStepIndex === index

                    return (
                      <div key={step.name} className={`relative flex items-start pb-8 ${index === statusSteps.length - 1 ? 'pb-0' : ''}`}>
                        <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mr-4 z-10
                          ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted border text-muted-foreground'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className={`pt-1 flex-grow ${isCompleted && !isActive ? 'opacity-70' : ''}`}>
                          <h3 className={`text-md font-semibold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                            {step.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Customer Info */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><ShoppingBag className="h-5 w-5 mr-2 text-primary"/> Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="space-y-3">
                {orderData.items.map((item) => (
                  <li key={item.menuItem?._id || item._id} className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-foreground">{item.menuItem?.name || "Unknown Item"}</span>
                      <span className="text-muted-foreground block">Qty: {item.quantity}</span>
                    </div>
                    <span className="text-foreground font-medium">
                      ${((item.menuItem?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold text-md">
                <span>Total</span>
                <span>${orderData.totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><User className="h-5 w-5 mr-2 text-primary"/>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{orderData.customer?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{orderData.customer?.email || "N/A"}</p>
              </div>
              {orderData.deliveryAddress && ( // Assuming you might have address
                <div>
                  <p className="text-muted-foreground">Delivery Address</p>
                  <p className="font-medium text-foreground">
                    {orderData.deliveryAddress.street}, {orderData.deliveryAddress.city}, {orderData.deliveryAddress.zipCode}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OrderTrackingPage