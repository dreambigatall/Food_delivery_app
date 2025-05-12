"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createOrder } from "../api"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cart, total, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    paymentMethod: "cash",
    notes: "",
  })

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      clearCart()
      navigate(`/track/${data.data._id}`)
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert("Your cart is empty")
      return
    }

    if (!isAuthenticated) {
      alert("Please login to place an order")
      navigate("/login", { state: { from: "/checkout" } })
      return
    }

    const orderData = {
      items: cart.map((item) => ({
        menuItem: item._id,
        quantity: item.quantity,
      })),
      notes: formData.notes,
    }

    orderMutation.mutate(orderData)
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-600 mb-4">Your cart is empty. Add some items before checkout.</p>
        <button
          onClick={() => navigate("/menu")}
          className="px-6 py-3 bg-orange-600 text-white font-medium rounded hover:bg-orange-700"
        >
          Browse Menu
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === "cash"}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="cash" className="ml-2 block text-sm text-gray-700">
                  Cash on Delivery
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="card" className="ml-2 block text-sm text-gray-700">
                  Credit/Debit Card
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Special instructions for delivery or food preparation..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={orderMutation.isPending || !isAuthenticated}
              className="w-full py-3 bg-orange-600 text-white font-medium rounded hover:bg-orange-700 disabled:bg-orange-400"
            >
              {orderMutation.isPending ? "Processing..." : "Place Order"}
            </button>

            {!isAuthenticated && <p className="mt-3 text-red-600 text-center">Please login to place an order</p>}

            {orderMutation.isError && (
              <p className="mt-3 text-red-600 text-center">
                {orderMutation.error?.response?.data?.message || "Error placing order. Please try again."}
              </p>
            )}
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Items ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h3>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>${(5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(total + 5 + total * 0.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
