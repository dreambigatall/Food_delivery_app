"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
// import { Button } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Phone, CheckCircle2 } from "lucide-react"

// Mock data - replace with API calls to your backend
const mockOrderDetails = {
  "ORD-001": {
    id: "ORD-001",
    date: "2023-04-15T18:30:00",
    status: "delivered",
    statusHistory: [
      { status: "order_placed", time: "2023-04-15T18:30:00", text: "Order Placed" },
      { status: "preparing", time: "2023-04-15T18:35:00", text: "Preparing Your Food" },
      { status: "ready_for_delivery", time: "2023-04-15T18:50:00", text: "Out for Delivery" },
      { status: "delivered", time: "2023-04-15T19:15:00", text: "Delivered" },
    ],
    items: [
      { id: 1, name: "Margherita Pizza", price: 12.99, quantity: 2 },
      { id: 6, name: "Iced Coffee", price: 4.99, quantity: 2 },
    ],
    subtotal: 35.96,
    deliveryFee: 3.99,
    tax: 2.85,
    total: 42.8,
    paymentMethod: "Credit Card",
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    customerName: "John Doe",
    customerPhone: "(555) 123-4567",
  },
  "ORD-002": {
    id: "ORD-002",
    date: "2023-04-10T12:15:00",
    status: "delivered",
    statusHistory: [
      { status: "order_placed", time: "2023-04-10T12:15:00", text: "Order Placed" },
      { status: "preparing", time: "2023-04-10T12:20:00", text: "Preparing Your Food" },
      { status: "ready_for_delivery", time: "2023-04-10T12:35:00", text: "Out for Delivery" },
      { status: "delivered", time: "2023-04-10T13:00:00", text: "Delivered" },
    ],
    items: [
      { id: 2, name: "Cheeseburger", price: 9.99, quantity: 1 },
      { id: 4, name: "Chocolate Cake", price: 7.99, quantity: 1 },
      { id: 6, name: "Iced Coffee", price: 4.99, quantity: 1 },
    ],
    subtotal: 22.97,
    deliveryFee: 3.99,
    tax: 1.84,
    total: 28.8,
    paymentMethod: "Cash on Delivery",
    deliveryAddress: "456 Park Ave, New York, NY 10022",
    customerName: "Jane Smith",
    customerPhone: "(555) 987-6543",
  },
  "ORD-003": {
    id: "ORD-003",
    date: "2023-04-05T19:45:00",
    status: "delivered",
    statusHistory: [
      { status: "order_placed", time: "2023-04-05T19:45:00", text: "Order Placed" },
      { status: "preparing", time: "2023-04-05T19:50:00", text: "Preparing Your Food" },
      { status: "ready_for_delivery", time: "2023-04-05T20:10:00", text: "Out for Delivery" },
      { status: "delivered", time: "2023-04-05T20:30:00", text: "Delivered" },
    ],
    items: [
      { id: 3, name: "California Roll", price: 14.99, quantity: 2 },
      { id: 8, name: "Dragon Roll", price: 16.99, quantity: 1 },
      { id: 6, name: "Iced Coffee", price: 4.99, quantity: 3 },
    ],
    subtotal: 61.94,
    deliveryFee: 3.99,
    tax: 4.96,
    total: 70.89,
    paymentMethod: "Credit Card",
    deliveryAddress: "789 Broadway, New York, NY 10003",
    customerName: "Robert Johnson",
    customerPhone: "(555) 456-7890",
  },
}

export default function OrderDetailsPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder(mockOrderDetails[id])
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Loading order details...</h1>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Order not found</h1>
        </div>
        <p>Sorry, we couldn't find the order you're looking for.</p>
      </div>
    )
  }

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

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500"
      case "preparing":
        return "bg-blue-500"
      case "delivering":
      case "ready_for_delivery":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Order {order.id}</h1>
        <Badge className={`ml-2 ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.quantity}x </span>
                      <span>{item.name}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted-foreground/30" />

                <div className="space-y-8">
                  {order.statusHistory.map((status, index) => (
                    <div key={index} className="relative pl-8">
                      <div
                        className={`absolute left-0 top-1 h-6 w-6 rounded-full flex items-center justify-center ${
                          index === order.statusHistory.length - 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted-foreground/30 text-muted-foreground"
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">{status.text}</h3>
                        <p className="text-sm text-muted-foreground">{formatDate(status.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-muted-foreground">{order.deliveryAddress}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-muted-foreground">{order.customerName}</p>
                    <p className="text-muted-foreground">{order.customerPhone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-muted-foreground">{order.paymentMethod}</p>
                </div>

                <div>
                  <p className="font-medium">Order Date</p>
                  <p className="text-muted-foreground">{formatDate(order.date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any issues with your order, please contact our customer support.
              </p>
              <Button className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
