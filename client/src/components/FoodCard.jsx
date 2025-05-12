// // "use client"

// // import { Link } from "react-router-dom"
// // import { useCart } from "../contexts/CartContext"

// // const FoodCard = ({ item }) => {
// //   const { addToCart } = useCart()

// //   return (
// //     <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
// //       <img
// //         src={item.imageUrl || "/placeholder.svg"}
// //         alt={item.name}
// //         className="w-full h-48 object-cover"
// //         onError={(e) => {
// //           e.target.onerror = null
// //           e.target.src = "/placeholder.svg"
// //         }}
// //       />
// //       <div className="p-4">
// //         <h3 className="text-lg font-semibold">{item.name}</h3>
// //         <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
// //         <div className="mt-3 flex justify-between items-center">
// //           <span className="text-orange-600 font-bold">${item.price.toFixed(2)}</span>
// //           <div className="flex space-x-2">
// //             <Link
// //               to={`/menu/${item._id}`}
// //               className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
// //             >
// //               Details
// //             </Link>
// //             <button
// //               onClick={() => addToCart(item)}
// //               className="px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
// //             >
// //               Add to Cart
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default FoodCard

// "use client"

// import { Link } from "react-router-dom"
// import { useCart } from "../contexts/CartContext"
// import { toast } from "sonner"; // Import toast for feedback

// const FoodCard = ({ item }) => {
//   const { addToCart } = useCart()

//   // Define a handler function for adding to cart
//   const handleAddToCart = () => {
//     // Basic validation
//     if (!item || !item._id) {
//       console.error("FoodCard: Item data or _id is missing.", item);
//       toast.error("Cannot add item", { description: "Item data is missing." });
//       return;
//     }

//     // --- THE FIX ---
//     // Create the object expected by CartContext
//     const itemToAdd = {
//       id: item._id,        // Map MongoDB _id to id
//       name: item.name,
//       price: item.price,
//       image: item.imageUrl, // Use imageUrl based on your image tag src
//       // Add any other properties you might need in the cart context/display
//     };
//     // -------------

//     // console.log("FoodCard: Adding to cart:", itemToAdd); // Optional: for debugging
//     addToCart(itemToAdd); // Pass the correctly structured object

//     // Optional: Give feedback using sonner (already imported)
//     // toast.success(`${item.name} added to cart!`); // This is already done in CartContext, maybe redundant here
//   };


//   // Added check in case item prop is somehow null/undefined
//   if (!item) {
//       return <div className="p-4 text-center text-red-500 border rounded-lg">Item data unavailable.</div>;
//   }


//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col"> {/* Added flex flex-col */}
//       <img
//         // Use item.imageUrl as per your original code
//         src={item.imageUrl || "/placeholder.svg?w=300&h=200"}
//         alt={item.name}
//         className="w-full h-48 object-cover"
//         // Provide a fallback on error
//         onError={(e) => {
//           e.target.onerror = null
//           e.target.src = "/placeholder.svg?w=300&h=200"
//         }}
//       />
//       {/* Added flex-grow to make content area fill space */}
//       <div className="p-4 flex flex-col flex-grow">
//         <h3 className="text-lg font-semibold">{item.name}</h3>
//         {/* Ensure description exists before trying to display */}
//         {item.description && (
//              <p className="text-gray-600 text-sm mt-1 line-clamp-2 flex-grow">{item.description}</p>
//         )}
//          {/* Pushes the footer content (price/buttons) down */}
//         <div className="mt-auto pt-3 flex justify-between items-center">
//           {/* Ensure price exists before formatting */}
//           <span className="text-orange-600 font-bold">${item.price ? item.price.toFixed(2) : 'N/A'}</span>
//           <div className="flex space-x-2">
//             {/* Ensure _id exists for the link */}
//             {item._id && (
//                 <Link
//                     to={`/menu/${item._id}`}
//                     className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//                 >
//                     Details
//                 </Link>
//             )}
//             {/* Update the onClick handler */}
//             <button
//               onClick={handleAddToCart} // Call the new handler function
//               className="px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FoodCard
// src/components/FoodCard.jsx (or your path)
"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../contexts/CartContext"; // Adjust path as needed

// Function to truncate text
const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export default function FoodCard({ item }) {
  const { addToCart } = useCart();

  if (!item || typeof item._id === 'undefined') { // Basic check for valid item
    console.warn("FoodCard received an invalid item prop:", item);
    return null; // Or render a placeholder/error state for this card
  }

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation if card is wrapped in Link
    e.stopPropagation(); // Prevent event bubbling
    addToCart(item, 1); // Adds 1 quantity by default from the card
  };

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
      <Link to={`/menu/${item._id}`} className="block"> {/* Link to item detail page */}
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          <img
            src={item.imageUrl || "/placeholder.svg?text=No+Image"}
            alt={item.name || "Food item"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.svg?text=No+Image&width=300&height=225";
            }}
          />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link to={`/menu/${item._id}`} className="block">
          <h3 className="text-lg font-semibold tracking-tight truncate mb-1 group-hover:text-primary">
            {item.name || "Unnamed Item"}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
          {truncateText(item.description, 60) || "No description available."}
        </p>
        {/* Optional: Rating display */}
        {/* <div className="flex items-center gap-0.5 text-xs text-muted-foreground mb-2">
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <span>{item.rating || 4.2}</span>
          <span className="ml-1">({item.reviewCount || 0} reviews)</span>
        </div> */}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex justify-between items-center w-full">
          <p className="text-xl font-bold text-primary">
            ${item.price?.toFixed(2) || "0.00"}
          </p>
          <Button
            size="sm"
            onClick={handleAddToCart}
            aria-label={`Add ${item.name} to cart`}
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}