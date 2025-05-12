// // "use client"
// // import { Link, useNavigate } from "react-router-dom"
// // import { useCart } from "../contexts/CartContext"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Separator } from "@/components/ui/separator"
// // import { Trash, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react"

// // export default function CartPage() {
// //   const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart()
// //   const navigate = useNavigate()

// //   if (cart.length === 0) {
// //     return (
// //       <div className="container py-16 text-center">
// //         <div className="max-w-md mx-auto">
// //           <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
// //           <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
// //           <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
// //           <Button asChild>
// //             <Link to="/menu">Browse Menu</Link>
// //           </Button>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="container py-8">
// //       <div className="flex items-center gap-2 mb-6">
// //         <Button variant="ghost" size="icon" asChild>
// //           <Link to="/menu">
// //             <ArrowLeft className="h-4 w-4" />
// //           </Link>
// //         </Button>
// //         <h1 className="text-2xl font-bold">Your Cart</h1>
// //       </div>

// //       <div className="grid md:grid-cols-3 gap-8">
// //         <div className="md:col-span-2">
// //           <div className="space-y-4">
// //             {cart.map((item) => (
// //               <Card key={item.id}>
// //                 <CardContent className="p-4">
// //                   <div className="flex gap-4">
// //                     <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
// //                       <img
// //                         src={item.image || "/placeholder.svg?height=80&width=80"}
// //                         alt={item.name}
// //                         className="w-full h-full object-cover"
// //                       />
// //                     </div>
// //                     <div className="flex-1">
// //                       <div className="flex justify-between">
// //                         <h3 className="font-medium">{item.name}</h3>
// //                         <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
// //                       </div>
// //                       <p className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)} each</p>
// //                       <div className="flex justify-between items-center">
// //                         <div className="flex items-center gap-2">
// //                           <Button
// //                             variant="outline"
// //                             size="icon"
// //                             className="h-8 w-8"
// //                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
// //                             disabled={item.quantity <= 1}
// //                           >
// //                             <Minus className="h-4 w-4" />
// //                           </Button>
// //                           <span className="w-8 text-center">{item.quantity}</span>
// //                           <Button
// //                             variant="outline"
// //                             size="icon"
// //                             className="h-8 w-8"
// //                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
// //                           >
// //                             <Plus className="h-4 w-4" />
// //                           </Button>
// //                         </div>
// //                         <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
// //                           <Trash className="h-4 w-4" />
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>

// //           <div className="mt-4 flex justify-end">
// //             <Button variant="ghost" onClick={clearCart}>
// //               Clear Cart
// //             </Button>
// //           </div>
// //         </div>

// //         <div>
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Order Summary</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <div className="flex justify-between">
// //                   <span>Subtotal</span>
// //                   <span>${totalPrice.toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span>Delivery Fee</span>
// //                   <span>$3.99</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span>Tax</span>
// //                   <span>${(totalPrice * 0.08).toFixed(2)}</span>
// //                 </div>
// //                 <Separator />
// //                 <div className="flex justify-between font-bold">
// //                   <span>Total</span>
// //                   <span>${(totalPrice + 3.99 + totalPrice * 0.08).toFixed(2)}</span>
// //                 </div>
// //               </div>
// //             </CardContent>
// //             <CardFooter>
// //               <Button className="w-full" size="lg" onClick={() => navigate("/checkout")}>
// //                 Proceed to Checkout
// //               </Button>
// //             </CardFooter>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// "use client"
// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useCart } from "../contexts/CartContext"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Trash, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react"
// import { createOrder as apiCreateOrder } from "../api/services/orderService" // Adjust path if needed

// // --- Correct Import for Sonner ---
// import { toast } from "sonner"
// // --- Remove this line ---
// // import { useToast } from "@/components/ui/use-toast"

// export default function CartPage() {
//   const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart()
//   const navigate = useNavigate()
//   const [isLoading, setIsLoading] = useState(false)

//   // --- Remove this line ---
//   // const { toast } = useToast() // Not needed for sonner

//   const handlePayOnDelivery = async () => {
//     setIsLoading(true)

//     const orderItems = cart.map(item => ({
//       menuItem: item.id,
//       quantity: item.quantity,
//     }))

//     const orderData = {
//       items: orderItems,
//       paymentMethod: 'PayOnDelivery',
//     }

//     console.log("Sending Order Data to Backend:", JSON.stringify(orderData, null, 2)); // Keep for debugging 400 error

//     try {
//       const createdOrder = await apiCreateOrder(orderData)
//       console.log("Order Created:", createdOrder)

//       // --- Use sonner's toast function ---
//       toast.success("Order Placed!", { // Using toast.success for semantics
//         description: "Your order has been successfully placed for Pay on Delivery.",
//       })

//       clearCart()
//       navigate("/orders/myorders")

//     } catch (error) {
//       console.error("Failed to create order:", error)
//       if (error.response) {
//         console.error("Backend Error Status:", error.response.status);
//         console.error("Backend Error Data:", error.response.data); // Check this for the 400 reason
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//       } else {
//         console.error("Error setting up request:", error.message);
//       }

//       // --- Use sonner's toast function (e.g., toast.error) ---
//       toast.error("Order Failed", { // Using toast.error
//         description: error.response?.data?.message || "Could not place the order. Please try again.",
//       })

//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // ... (rest of the component remains the same) ...

//   if (cart.length === 0) {
//     // ... empty cart logic ...
//     return (
//         <div className="container py-16 text-center">
//           <div className="max-w-md mx-auto">
//             <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
//             <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
//             <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
//             <Button asChild>
//               <Link to="/menu">Browse Menu</Link>
//             </Button>
//           </div>
//         </div>
//       )
//   }

//   const deliveryFee = 3.99;
//   const taxRate = 0.08;
//   const taxAmount = totalPrice * taxRate;
//   const grandTotal = totalPrice + deliveryFee + taxAmount;

//   return (
//     <div className="container py-8">
//       {/* ... header ... */}
//       <div className="flex items-center gap-2 mb-6">
//         <Button variant="ghost" size="icon" asChild>
//           <Link to="/menu">
//             <ArrowLeft className="h-4 w-4" />
//           </Link>
//         </Button>
//         <h1 className="text-2xl font-bold">Your Cart</h1>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8">
//         {/* ... cart items list ... */}
//          <div className="md:col-span-2">
//           <div className="space-y-4">
//             {cart.map((item) => (
//               <Card key={item.id}>
//                 <CardContent className="p-4">
//                   <div className="flex gap-4">
//                     <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
//                       <img
//                         src={item.image || "/placeholder.svg?height=80&width=80"}
//                         alt={item.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex justify-between">
//                         <h3 className="font-medium">{item.name}</h3>
//                         <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
//                       </div>
//                       <p className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)} each</p>
//                       <div className="flex justify-between items-center">
//                         <div className="flex items-center gap-2">
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             disabled={item.quantity <= 1}
//                           >
//                             <Minus className="h-4 w-4" />
//                           </Button>
//                           <span className="w-8 text-center">{item.quantity}</span>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           >
//                             <Plus className="h-4 w-4" />
//                           </Button>
//                         </div>
//                         <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
//                           <Trash className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <div className="mt-4 flex justify-end">
//             <Button variant="ghost" onClick={clearCart} disabled={isLoading}>
//               Clear Cart
//             </Button>
//           </div>
//         </div>

//         {/* ... Order Summary card ... */}
//          <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>${totalPrice.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Delivery Fee</span>
//                   <span>${deliveryFee.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
//                   <span>${taxAmount.toFixed(2)}</span>
//                 </div>
//                 <Separator />
//                 <div className="flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>${grandTotal.toFixed(2)}</span>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex flex-col gap-3">
//               <Button
//                 className="w-full"
//                 size="lg"
//                 onClick={() => navigate("/checkout")}
//                 disabled={isLoading}
//               >
//                 Proceed to Checkout (Online Payment)
//               </Button>
//               <Button
//                 className="w-full"
//                 size="lg"
//                 variant="secondary"
//                 onClick={handlePayOnDelivery}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Placing Order..." : "Pay on Delivery"}
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>

//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash, Plus, Minus, ArrowLeft, ShoppingBag, Loader2 } from "lucide-react" // Added Loader2
import { createOrder as apiCreateOrder } from "../api/services/orderService"
import { toast } from "sonner"
import { useAuth } from "../contexts/AuthContext" // Assuming you have this

export default function CartPage() {
  const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart()
  const { user } = useAuth(); // Get the authenticated user
  const navigate = useNavigate()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false) // Renamed for clarity

  const deliveryFee = 3.99; // Example, make this configurable or dynamic
  const taxRate = 0.08;     // Example
  const taxAmount = totalPrice * taxRate;
  const grandTotal = totalPrice + deliveryFee + taxAmount;

  const handlePayOnDelivery = async () => {
    if (!user) {
      toast.error("Authentication Required", {
        description: "Please log in to place an order.",
      });
      navigate("/login"); // Or your login route
      return;
    }

    setIsPlacingOrder(true)

    const orderItems = cart.map(cartItem => ({ // Use cartItem to avoid confusion with item from outer scope
      menuItem: cartItem._id, // Use cartItem._id
      quantity: cartItem.quantity,
      priceAtOrder: cartItem.price // Good practice to store price at time of order
    }))

    const orderData = {
      customer: user._id, // Assuming user object has _id
      items: orderItems,
      totalAmount: grandTotal, // Send the final calculated total
      paymentMethod: 'PayOnDelivery',
      paymentStatus: 'Pending', // Initial status for PoD
      // deliveryAddress: user.defaultAddress || { /* Prompt or use a default */ }, // Add if needed by backend
    }

    console.log("Sending Order Data to Backend:", JSON.stringify(orderData, null, 2));

    try {
      const createdOrderResponse = await apiCreateOrder(orderData)
      // Assuming your apiCreateOrder returns the created order directly or in a 'data' property
      const createdOrder = createdOrderResponse.data || createdOrderResponse;

      console.log("Order Created:", createdOrder)

      toast.success("Order Placed Successfully!", {
        description: `Your order #${createdOrder.orderNumber || createdOrder._id?.slice(-6) || 'ID'} for Pay on Delivery is confirmed.`,
      })

      clearCart()
      // Navigate to the specific order tracking page if _id exists
      if (createdOrder?._id) {
        navigate(`/orders/${createdOrder._id}`);
      } else {
        navigate("/orders/myorders"); // Fallback
      }

    } catch (error) {
      console.error("Failed to create order:", error)
      let errorMessage = "Could not place the order. Please try again.";
      if (error.response) {
        console.error("Backend Error Status:", error.response.status);
        console.error("Backend Error Data:", error.response.data);
        const errData = error.response.data;
        if (typeof errData === 'string') {
            errorMessage = errData;
        } else if (errData && errData.message) {
            errorMessage = errData.message;
        } else if (errData && errData.error) {
             errorMessage = errData.error;
        } else if (errData && Array.isArray(errData.errors) && errData.errors.length > 0) {
            errorMessage = errData.errors.map(e => e.msg || e.message || JSON.stringify(e)).join(', ');
        } else if (typeof errData === 'object' && errData !== null) {
            errorMessage = JSON.stringify(errData); // Fallback for complex error objects
        }
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      } else {
        errorMessage = "An unexpected error occurred while setting up the request.";
      }
      toast.error("Order Placement Failed", { description: errorMessage })
    } finally {
      setIsPlacingOrder(false)
    }
  }

  if (cart.length === 0) {
    return (
        <div className="container py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-20 w-20 mx-auto mb-6 text-muted-foreground opacity-50" />
            <h1 className="text-3xl font-bold mb-3">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any culinary delights yet.
            </p>
            <Button asChild size="lg">
              <Link to="/menu">Browse Our Menu</Link>
            </Button>
          </div>
        </div>
      )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-2 mb-6 md:mb-8">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/menu">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Menu</span>
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Your Shopping Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
         <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => ( // 'item' here is a cart item, which has _id
              <Card key={item._id} className="overflow-hidden"> {/* USE item._id for key */}
                <CardContent className="p-4 flex gap-4 items-start">
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={item.imageUrl || "/placeholder.svg?height=100&width=100&text=No+Image"} // Ensure item has imageUrl
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.svg?height=100&width=100&text=No+Image"; }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                      <p className="font-semibold text-lg whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      ${item.price.toFixed(2)} each
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-r-none"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)} // USE item._id
                          disabled={item.quantity <= 1 || isPlacingOrder}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="h-9 w-12 text-center flex items-center justify-center border-y font-medium bg-background">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-l-none"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)} // USE item._id
                          disabled={isPlacingOrder}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive rounded-full"
                        onClick={() => removeFromCart(item._id)} // USE item._id
                        disabled={isPlacingOrder}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={clearCart} disabled={isPlacingOrder}>
                <Trash className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          )}
        </div>

         <div className="lg:sticky lg:top-24"> {/* Make summary sticky on larger screens */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax ({(taxRate * 100).toFixed(0)}%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-6"> {/* Added padding top */}
              <Button
                className="w-full"
                size="lg"
                onClick={() => navigate("/checkout")} // Assuming /checkout handles online payment
                disabled={isPlacingOrder}
              >
                Proceed to Checkout
              </Button>
              <Button
                className="w-full"
                size="lg"
                variant="secondary"
                onClick={handlePayOnDelivery}
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Pay on Delivery"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}