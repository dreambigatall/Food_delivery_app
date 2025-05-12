// // "use client"

// // import { createContext, useContext, useState, useEffect } from "react"
// // //import { useToast } from "@/components/ui/use-toast"

// // const CartContext = createContext()

// // export const useCart = () => useContext(CartContext)

// // export const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState([])
// //   const [totalItems, setTotalItems] = useState(0)
// //   const [totalPrice, setTotalPrice] = useState(0)
// //   //const { toast } = useToast()

// //   useEffect(() => {
// //     // Load cart from localStorage on initial load
// //     const savedCart = localStorage.getItem("foodCart")
// //     if (savedCart) {
// //       setCart(JSON.parse(savedCart))
// //     }
// //   }, [])

// //   useEffect(() => {
// //     // Update totals whenever cart changes
// //     const items = cart.reduce((total, item) => total + item.quantity, 0)
// //     const price = cart.reduce((total, item) => total + item.price * item.quantity, 0)

// //     setTotalItems(items)
// //     setTotalPrice(price)

// //     // Save to localStorage
// //     localStorage.setItem("foodCart", JSON.stringify(cart))
// //   }, [cart])

// //   const addToCart = (item) => {
// //     setCart((prevCart) => {
// //       const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id)

// //       if (existingItemIndex >= 0) {
// //         // Item exists, update quantity
// //         const updatedCart = [...prevCart]
// //         updatedCart[existingItemIndex] = {
// //           ...updatedCart[existingItemIndex],
// //           quantity: updatedCart[existingItemIndex].quantity + 1,
// //         }
// //         return updatedCart
// //       } else {
// //         // Item doesn't exist, add new item
// //         return [...prevCart, { ...item, quantity: 1 }]
// //       }
// //     })

// //     // toast({
// //     //   title: "Added to cart",
// //     //   description: `${item.name} has been added to your cart.`,
// //     // })
// //   }

// //   const removeFromCart = (itemId) => {
// //     setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
// //   }

// //   const updateQuantity = (itemId, quantity) => {
// //     if (quantity < 1) return

// //     setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
// //   }

// //   const clearCart = () => {
// //     setCart([])
// //   }

// //   return (
// //     <CartContext.Provider
// //       value={{
// //         cart,
// //         totalItems,
// //         totalPrice,
// //         addToCart,
// //         removeFromCart,
// //         updateQuantity,
// //         clearCart,
// //       }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   )
// // }
// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "sonner"; // Import toast from sonner

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   // No need for useToast hook anymore
//   // const { toast } = useToast()

//   useEffect(() => {
//     // Load cart from localStorage on initial load
//     const savedCart = localStorage.getItem("foodCart");
//     if (savedCart) {
//       // Basic validation: Check if it's potentially valid JSON
//       try {
//         const parsedCart = JSON.parse(savedCart);
//         // Basic check if it's an array (could add more checks)
//         if (Array.isArray(parsedCart)) {
//            setCart(parsedCart);
//         } else {
//           console.warn("Loaded cart data from localStorage is not an array.");
//           localStorage.removeItem("foodCart"); // Clear invalid data
//         }
//       } catch (error) {
//         console.error("Failed to parse cart data from localStorage:", error);
//         localStorage.removeItem("foodCart"); // Clear corrupted data
//       }
//     }
//   }, []);

//   useEffect(() => {
//     // Update totals whenever cart changes
//     const items = cart.reduce((total, item) => total + item.quantity, 0);
//     const price = cart.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );

//     setTotalItems(items);
//     setTotalPrice(price);

//     // Save to localStorage only if cart is not empty
//     // or if it was previously non-empty (to clear it)
//     if (cart.length > 0 || localStorage.getItem("foodCart")) {
//        try {
//          localStorage.setItem("foodCart", JSON.stringify(cart));
//        } catch (error) {
//          console.error("Failed to save cart data to localStorage:", error);
//          // Handle potential storage quota exceeded errors if necessary
//        }
//     }

//   }, [cart]);

//   const addToCart = (item) => {
//     setCart((prevCart) => {
//       const existingItemIndex = prevCart.findIndex(
//         (cartItem) => cartItem.id === item.id
//       );

//       if (existingItemIndex >= 0) {
//         // Item exists, update quantity
//         const updatedCart = [...prevCart];
//         updatedCart[existingItemIndex] = {
//           ...updatedCart[existingItemIndex],
//           quantity: updatedCart[existingItemIndex].quantity + 1,
//         };
//         return updatedCart;
//       } else {
//         // Item doesn't exist, add new item
//         return [...prevCart, { ...item, quantity: 1 }];
//       }
//     });

//     // --- Use sonner toast ---
//     toast.success(`${item.name} added to cart!`);
//     // You can also add descriptions or actions if needed:
//     // toast.success("Added to cart", {
//     //   description: `${item.name} has been added to your cart.`,
//     //   // action: {
//     //   //   label: "Undo",
//     //   //   onClick: () => console.log("Undo!"),
//     //   // },
//     // });
//     // --- End sonner toast ---
//   };

//   const removeFromCart = (itemId) => {
//     const itemToRemove = cart.find(item => item.id === itemId);
//     setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
//      if (itemToRemove) {
//       toast.info(`${itemToRemove.name} removed from cart.`);
//     }
//   };

//   const updateQuantity = (itemId, quantity) => {
//     if (quantity < 1) {
//       // Optionally remove item if quantity goes below 1
//       removeFromCart(itemId);
//       return;
//       // Or just prevent going below 1:
//       // toast.warning("Quantity cannot be less than 1.");
//       // return;
//     }

//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === itemId ? { ...item, quantity } : item
//       )
//     );
//      // Optionally add a toast for quantity update
//      // const itemUpdated = cart.find(item => item.id === itemId);
//      // if (itemUpdated) {
//      //   toast.info(`${itemUpdated.name} quantity updated to ${quantity}.`);
//      // }
//   };

//   const clearCart = () => {
//     setCart([]);
//     toast.info("Cart cleared.");
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         totalItems,
//         totalPrice,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("foodCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          console.warn("Loaded cart data from localStorage is not an array. Clearing.");
          localStorage.removeItem("foodCart");
        }
      } catch (error) { // ADDED BRACES HERE
        console.error("Failed to parse cart data from localStorage. Clearing.", error);
        localStorage.removeItem("foodCart");
      } // AND HERE
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0 || (cart.length === 0 && localStorage.getItem("foodCart") !== null) ) {
      try {
        localStorage.setItem("foodCart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart data to localStorage:", error);
      }
    }
  }, [cart]);

  const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalPrice = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  const addToCart = (itemToAdd, quantityToAdd = 1) => {
    // VALIDATE AGAINST _id
    if (!itemToAdd || typeof itemToAdd._id === 'undefined' || typeof itemToAdd.price === 'undefined') {
        console.error("Attempted to add invalid item to cart (missing _id or price):", itemToAdd);
        toast.error("Could not add item", { description: "Invalid item data." });
        return;
    }
    if (quantityToAdd < 1) {
        console.warn("Attempted to add item with quantity less than 1:", quantityToAdd);
        toast.warning("Quantity must be at least 1.");
        return;
    }

    setCart((prevCart) => {
      // COMPARE USING _id
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem._id === itemToAdd._id
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantityToAdd,
        };
        return updatedCart;
      } else {
        // WHEN ADDING, ENSURE THE CART ITEM HAS _id (it will from itemToAdd)
        return [...prevCart, { ...itemToAdd, quantity: quantityToAdd }];
      }
    });

    toast.success(`${itemToAdd.name} (${quantityToAdd}) added to cart!`);
  };

  const removeFromCart = (itemId) => { // This itemId should be the _id
    const itemToRemove = cart.find(item => item._id === itemId);
    // COMPARE USING _id
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    if (itemToRemove) {
      toast.info(`${itemToRemove.name} removed from cart.`);
    }
  };

  const updateQuantity = (itemId, newQuantity) => { // This itemId should be the _id
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCart((prevCart) =>
      // COMPARE USING _id
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared successfully.");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};