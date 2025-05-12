// // "use client"

// // import { useState } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { useQuery } from "@tanstack/react-query"
// // import { fetchMenuItem } from "../api"
// // import { useCart } from "../contexts/CartContext"

// // const ItemDetailPage = () => {
// //   const { id } = useParams()
// //   const navigate = useNavigate()
// //   const { addToCart } = useCart()
// //   const [quantity, setQuantity] = useState(1)

// //   const {
// //     data: item,
// //     isLoading,
// //     error,
// //   } = useQuery({
// //     queryKey: ["menuItem", id],
// //     queryFn: async () => {
// //       const response = await fetchMenuItem(id)
// //       return response.data
// //     },
// //   })

// //   const handleAddToCart = () => {
// //     if (item) {
// //       for (let i = 0; i < quantity; i++) {
// //         addToCart(item)
// //       }
// //       navigate("/cart")
// //     }
// //   }

// //   if (isLoading) {
// //     return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">Loading item details...</div>
// //   }

// //   if (error || !item) {
// //     return (
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
// //         <p className="text-red-600">Error loading item details. Please try again.</p>
// //         <button
// //           onClick={() => navigate("/menu")}
// //           className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
// //         >
// //           Back to Menu
// //         </button>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //       <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-orange-600 hover:text-orange-800">
// //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
// //           <path
// //             fillRule="evenodd"
// //             d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
// //             clipRule="evenodd"
// //           />
// //         </svg>
// //         Back
// //       </button>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //         <div className="rounded-lg overflow-hidden shadow-md">
// //           <img
// //             src={item.imageUrl || "/placeholder.svg"}
// //             alt={item.name}
// //             className="w-full h-auto object-cover"
// //             onError={(e) => {
// //               e.target.onerror = null
// //               e.target.src = "/placeholder.svg"
// //             }}
// //           />
// //         </div>

// //         <div>
// //           <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
// //           <p className="text-2xl text-orange-600 font-bold mb-4">${item.price.toFixed(2)}</p>
// //           <p className="text-sm text-gray-500 mb-4">Category: {item.category}</p>

// //           <div className="mb-6">
// //             <h2 className="text-lg font-semibold mb-2">Description</h2>
// //             <p className="text-gray-700">{item.description || "No description available."}</p>
// //           </div>

// //           <div className="mb-6">
// //             <h2 className="text-lg font-semibold mb-2">Quantity</h2>
// //             <div className="flex items-center">
// //               <button
// //                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
// //                 className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-l"
// //               >
// //                 -
// //               </button>
// //               <span className="w-16 h-10 flex items-center justify-center bg-gray-100">{quantity}</span>
// //               <button
// //                 onClick={() => setQuantity(quantity + 1)}
// //                 className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-r"
// //               >
// //                 +
// //               </button>
// //             </div>
// //           </div>

// //           <button
// //             onClick={handleAddToCart}
// //             className="w-full py-3 bg-orange-600 text-white font-medium rounded hover:bg-orange-700"
// //           >
// //             Add to Cart - ${(item.price * quantity).toFixed(2)}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ItemDetailPage

// "use client"

// import { useState } from "react"
// import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
// import { useQuery } from "@tanstack/react-query"
// import { fetchMenuItem } from "../api" // Ensure this path is correct
// import { useCart } from "../contexts/CartContext" // Ensure this path is correct

// // Shadcn/ui components
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { Skeleton } from "@/components/ui/skeleton" // For loading state

// // Lucide Icons
// import { ArrowLeft, Plus, Minus, ShoppingCart, Star, AlertTriangle, Info } from "lucide-react"

// const ItemDetailPage = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const { addToCart } = useCart()
//   const [quantity, setQuantity] = useState(1)

//   const {
//     data: item,
//     isLoading,
//     error,
//     isError, // More specific error flag from react-query
//   } = useQuery({
//     queryKey: ["menuItem", id],
//     queryFn: async () => {
//       const response = await fetchMenuItem(id)
//       if (!response?.data) { // Basic check for valid response structure
//         throw new Error("Item data not found in response")
//       }
//       return response.data
//     },
//     retry: 1, // Don't retry too many times for a simple fetch
//   })

//   const handleAddToCart = () => {
//     if (item) {
//       // Pass the full item object and the selected quantity
//       addToCart(item, quantity)
//       navigate("/cart")
//     }
//   }

//   // --- Loading State ---
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8 md:py-12">
//         <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
//           {/* Image Skeleton */}
//           <Skeleton className="w-full aspect-square rounded-lg" />
//           {/* Details Skeleton */}
//           <div className="space-y-6">
//             <Skeleton className="h-10 w-3/4" /> {/* Name */}
//             <Skeleton className="h-8 w-1/4" /> {/* Price */}
//             <Skeleton className="h-6 w-1/5 mb-4" /> {/* Category */}
//             <div className="space-y-2">
//               <Skeleton className="h-6 w-1/3" /> {/* Description Title */}
//               <Skeleton className="h-5 w-full" />
//               <Skeleton className="h-5 w-full" />
//               <Skeleton className="h-5 w-4/5" />
//             </div>
//             <div className="flex items-center gap-4">
//                 <Skeleton className="h-12 w-12 rounded-md" /> {/* Minus button */}
//                 <Skeleton className="h-12 w-16 rounded-md" /> {/* Quantity display */}
//                 <Skeleton className="h-12 w-12 rounded-md" /> {/* Plus button */}
//             </div>
//             <Skeleton className="h-12 w-full rounded-md" /> {/* Add to cart button */}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // --- Error State ---
//   if (isError || !item) {
//     return (
//       <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
//         <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
//         <h2 className="text-2xl font-semibold text-destructive-foreground mb-2">
//           Oops! Item Not Found
//         </h2>
//         <p className="text-muted-foreground mb-8 max-w-md">
//           {error?.message || "We couldn't find the details for this item."}
//           Please check the URL or try again.
//         </p>
//         <Button asChild>
//           <RouterLink to="/menu">
//             <ArrowLeft className="h-4 w-4 mr-2" /> Back to Menu
//           </RouterLink>
//         </Button>
//       </div>
//     )
//   }

//   // --- Main Content ---
//   return (
//     <div className="container mx-auto px-2 sm:px-4 py-8 md:py-12">
//       <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-muted-foreground hover:text-foreground">
//         <ArrowLeft className="h-5 w-5 mr-2" />
//         Back
//       </Button>

//       <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
//         {/* Image Section */}
//         <div className="md:col-span-2">
//           <Card className="overflow-hidden shadow-lg sticky top-24"> {/* Sticky for larger screens */}
//             <div className="aspect-square bg-muted"> {/* Ensures consistent image box */}
//                 <img
//                     src={item.imageUrl || "/placeholder.svg?text=Image+Not+Available"}
//                     alt={item.name}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                     onError={(e) => {
//                     e.target.onerror = null // Prevents infinite loop if placeholder also fails
//                     e.target.src = "/placeholder.svg?text=Image+Not+Available&width=400&height=400"
//                     }}
//                 />
//             </div>
//           </Card>
//         </div>

//         {/* Details Section */}
//         <div className="md:col-span-3">
//           <Badge variant="outline" className="mb-2">{item.category || "Uncategorized"}</Badge>
//           <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">{item.name}</h1>
//           <p className="text-3xl font-semibold text-primary mb-6">${item.price?.toFixed(2) || "N/A"}</p>

//           {/* Optional: Add a simple rating display if you have rating data */}
//           {/* <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
//             <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//             <span>{item.rating || 4.5} (120 reviews)</span>
//           </div> */}

//           <Separator className="my-6" />

//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center">
//                 <Info className="h-5 w-5 mr-2 text-primary" />
//                 Description
//             </h2>
//             <p className="text-muted-foreground leading-relaxed">
//               {item.description || "No detailed description available for this item."}
//             </p>
//           </div>

//           <Separator className="my-6" />

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-foreground mb-3">Quantity</h2>
//             <div className="flex items-center">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="h-11 w-11 rounded-r-none"
//                 disabled={quantity <= 1}
//               >
//                 <Minus className="h-5 w-5" />
//               </Button>
//               <span className="h-11 w-16 flex items-center justify-center text-lg font-medium border-y bg-background">
//                 {quantity}
//               </span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="h-11 w-11 rounded-l-none"
//               >
//                 <Plus className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>

//           <Button
//             size="lg"
//             className="w-full py-6 text-lg"
//             onClick={handleAddToCart}
//             disabled={!item} // Disable if item data is somehow missing
//           >
//             <ShoppingCart className="h-5 w-5 mr-2" />
//             Add to Cart - ${(item.price * quantity).toFixed(2)}
//           </Button>

//           {/* Optional: Add dietary information, allergens, etc. if available */}
//           {/* <div className="mt-6 text-sm text-muted-foreground">
//             <p>Allergens: {item.allergens || "None listed"}</p>
//             <p>Dietary Info: {item.dietary || "N/A"}</p>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ItemDetailPage

"use client"

import { useState } from "react"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchMenuItem } from "../api" // Ensure this path is correct
import { useCart } from "../contexts/CartContext" // Ensure this path is correct

// Shadcn/ui components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card" // Removed CardContent as it wasn't directly used here
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton" // For loading state

// Lucide Icons
import { ArrowLeft, Plus, Minus, ShoppingCart, AlertTriangle, Info } from "lucide-react" // Removed Star for now

const ItemDetailPage = () => {
  const { id } = useParams() // This 'id' is the _id from the URL
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const {
    data: item, // This 'item' object will have _id from the backend
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["menuItem", id],
    queryFn: async () => {
      const response = await fetchMenuItem(id) // 'id' here is the _id
      if (!response?.data) {
        throw new Error("Item data not found in response")
      }
      return response.data
    },
    retry: 1,
  })

  const handleAddToCart = () => {
    if (item) {
      // 'item' has _id, so CartContext's addToCart will work correctly
      addToCart(item, quantity)
      navigate("/cart")
    }
  }

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button variant="ghost" className="mb-6 invisible"> {/* Placeholder for layout */}
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            <Skeleton className="w-full aspect-square rounded-lg" />
          </div>
          <div className="md:col-span-3 space-y-6">
            <Skeleton className="h-6 w-1/4" /> {/* Badge */}
            <Skeleton className="h-10 w-3/4" /> {/* Name */}
            <Skeleton className="h-8 w-1/4" /> {/* Price */}
            <Separator className="my-6 !mt-2 !mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/3" /> {/* Description Title */}
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>
             <Separator className="my-6 !mt-2 !mb-2" />
            <Skeleton className="h-6 w-1/3" /> {/* Quantity Title */}
            <div className="flex items-center gap-0"> {/* Adjusted gap for skeleton */}
                <Skeleton className="h-11 w-11 rounded-r-none" />
                <Skeleton className="h-11 w-16 border-y" />
                <Skeleton className="h-11 w-11 rounded-l-none" />
            </div>
            <Skeleton className="h-14 w-full rounded-md" /> {/* Add to cart button */}
          </div>
        </div>
      </div>
    )
  }

  // --- Error State ---
  if (isError || !item) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center"> {/* Adjusted min-height */}
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-2xl font-semibold text-destructive-foreground mb-2">
          Oops! Item Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          {error?.message || "We couldn't find the details for this item."}
          Please check the URL or try again.
        </p>
        <Button asChild>
          <RouterLink to="/menu">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Menu
          </RouterLink>
        </Button>
      </div>
    )
  }

  // --- Main Content ---
  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 md:py-12">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="md:col-span-2">
          <Card className="overflow-hidden shadow-lg md:sticky md:top-24"> {/* Sticky for larger screens */}
            <div className="aspect-square bg-muted">
                <img
                    src={item.imageUrl || "/placeholder.svg?text=Image+Not+Available"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg?text=Image+Not+Available&width=400&height=400"
                    }}
                />
            </div>
          </Card>
        </div>

        {/* Details Section */}
        <div className="md:col-span-3">
          <Badge variant="outline" className="mb-2">{item.category || "Uncategorized"}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">{item.name}</h1>
          <p className="text-3xl font-semibold text-primary mb-6">${item.price?.toFixed(2) || "N/A"}</p>

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                Description
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {item.description || "No detailed description available for this item."}
            </p>
          </div>

          <Separator className="my-6" />

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">Quantity</h2>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-11 w-11 rounded-r-none"
                disabled={quantity <= 1}
              >
                <Minus className="h-5 w-5" />
              </Button>
              <span className="h-11 w-16 flex items-center justify-center text-lg font-medium border-y bg-background">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-11 w-11 rounded-l-none"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full py-6 text-lg"
            onClick={handleAddToCart}
            disabled={!item}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart - ${(item.price && quantity ? (item.price * quantity) : 0).toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailPage