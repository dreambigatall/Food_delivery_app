// "use client"

// import { useState, useEffect } from "react"
// import { useQuery } from "@tanstack/react-query"
// import { useSearchParams } from "react-router-dom"
// import { fetchMenuItems } from "../api"
// import FoodCard from "../components/FoodCard"
// import CategoryFilter from "../components/CategoryFilter"

// const MenuPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const initialCategory = searchParams.get("category")
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [categories, setCategories] = useState([])

//   const { data: menuItems, isLoading: isLoadingMenuItems } = useQuery({
//     queryKey: ["menuItems"],
//     queryFn: async () => {
//       const response = await fetchMenuItems()
//       return response.data
//     },
//   })

//   // Extract unique categories from menu items
//   useEffect(() => {
//     if (menuItems) {
//       const uniqueCategories = [...new Set(menuItems.map((item) => item.category))].map((category) => ({
//         id: category,
//         name: category,
//       }))
//       setCategories(uniqueCategories)
//     }
//   }, [menuItems])

//   const handleCategorySelect = (categoryId) => {
//     setSelectedCategory(categoryId)
//     if (categoryId) {
//       setSearchParams({ category: categoryId })
//     } else {
//       setSearchParams({})
//     }
//   }

//   const filteredItems = menuItems?.filter((item) => {
//     const matchesCategory = !selectedCategory || item.category === selectedCategory
//     const matchesSearch =
//       !searchTerm ||
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))

//     return matchesCategory && matchesSearch
//   })

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold mb-6">Our Menu</h1>

//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search for food..."
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {isLoadingMenuItems ? (
//         <div className="text-center py-4">Loading categories...</div>
//       ) : (
//         <CategoryFilter
//           categories={categories || []}
//           selectedCategory={selectedCategory}
//           onSelectCategory={handleCategorySelect}
//         />
//       )}

//       {isLoadingMenuItems ? (
//         <div className="text-center py-8">Loading menu items...</div>
//       ) : filteredItems?.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-600">No items found. Try a different search or category.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredItems?.map((item) => (
//             <FoodCard key={item._id} item={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default MenuPage

"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams, useNavigate } from "react-router-dom" // useNavigate for programmatic navigation
import { fetchMenuItems } from "../api" // Assuming this is correctly set up
import FoodCard from "../components/FoodCard" // Assuming this component is well-styled
// import CategoryFilter from "../components/CategoryFilter"; // We'll inline a more styled version or make a new one

// Lucide Icons for better UI
import { Search, Utensils, X, Loader2, Soup, Pizza, Sandwich, IceCream } from "lucide-react"
import { Button } from "@/components/ui/button" // Assuming you have shadcn/ui Button
import { Input } from "@/components/ui/input" // Assuming you have shadcn/ui Input

// --- Helper: Skeleton Card (Placeholder for FoodCard during loading) ---
const FoodCardSkeleton = () => (
  <div className="bg-card border rounded-lg overflow-hidden shadow-sm animate-pulse">
    <div className="w-full h-48 bg-muted"></div>
    <div className="p-4">
      <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-muted rounded mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 w-20 bg-muted rounded"></div>
        <div className="h-10 w-24 bg-muted rounded-md"></div>
      </div>
    </div>
  </div>
)

// --- Helper: Category Icon Map (Optional, for visual flair) ---
const categoryIcons = {
  default: <Soup className="h-5 w-5 mr-2" />,
  pizza: <Pizza className="h-5 w-5 mr-2" />,
  burgers: <Sandwich className="h-5 w-5 mr-2" />,
  desserts: <IceCream className="h-5 w-5 mr-2" />,
  // Add more as needed
}

const getCategoryIcon = (categoryName) => {
  const key = categoryName?.toLowerCase().split(" ")[0] // Simple mapping
  return categoryIcons[key] || categoryIcons.default
}


export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate() // For cleaner URL updates

  const initialCategory = searchParams.get("category") || "" // Default to empty string for "All"
  const initialSearchTerm = searchParams.get("search") || ""

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [allCategories, setAllCategories] = useState([]) // Renamed for clarity

  const { data: menuItems, isLoading: isLoadingMenuItems, error } = useQuery({
    queryKey: ["menuItems"],
    queryFn: async () => {
      // Simulate API delay for testing loading states
      // await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await fetchMenuItems()
      // Ensure response.data is an array
      if (!Array.isArray(response?.data)) {
        console.error("fetchMenuItems did not return an array in response.data:", response)
        return [] // Return empty array on error or unexpected format
      }
      return response.data
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })

  // Extract unique categories from menu items
  useEffect(() => {
    if (menuItems) {
      const uniqueCategories = [
        ...new Set(menuItems.map((item) => item.category?.trim()).filter(Boolean)),
      ].sort() // Sort for consistent order
      setAllCategories(uniqueCategories)
    }
  }, [menuItems])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set("category", selectedCategory)
    if (searchTerm) params.set("search", searchTerm)
    // navigate(`?${params.toString()}`, { replace: true }); // Using setSearchParams is often preferred for this
    setSearchParams(params, { replace: true })
  }, [selectedCategory, searchTerm, setSearchParams])


  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId || "") // Ensure "" for "All"
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  const filteredItems = menuItems?.filter((item) => {
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    const matchesSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <X className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong.</h2>
        <p className="text-muted-foreground">We couldn't load the menu. Please try again later.</p>
        <Button onClick={() => window.location.reload()} className="mt-6">Refresh Page</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section - Could be part of a global layout */}
      <header className="py-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Discover Our Delicious Menu
          </h1>
          <p className="mt-2 text-lg opacity-90">Fresh ingredients, unforgettable flavors.</p>
        </div>
      </header>

      {/* Filters and Search Section - Sticky */}
      {/* Add top-X class if you have a fixed global navbar, e.g., top-16 if navbar is h-16 */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm shadow-md py-4 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full md:flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for dishes, ingredients..."
                className="w-full pl-10 pr-10 py-3 text-base rounded-full border-border focus-visible:ring-primary"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Category Filters - Scrollable on mobile */}
          <div className="mt-4">
            {isLoadingMenuItems && !allCategories.length ? (
              <div className="flex space-x-2 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-24 bg-muted rounded-full"></div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2 no-scrollbar">
                <Button
                  variant={!selectedCategory ? "default" : "outline"}
                  onClick={() => handleCategorySelect("")}
                  className="rounded-full whitespace-nowrap flex-shrink-0"
                  size="sm"
                >
                  <Utensils className="h-4 w-4 mr-1.5" /> All Items
                </Button>
                {allCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => handleCategorySelect(category)}
                    className="rounded-full whitespace-nowrap flex-shrink-0"
                    size="sm"
                  >
                    {getCategoryIcon(category)}
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <main className="container mx-auto px-4 pb-16">
        {isLoadingMenuItems ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredItems.map((item) => (
              <FoodCard key={item._id || item.id} item={item} /> // Use item.id if _id is not present
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Soup className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-50" /> {/* Or SearchX */}
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No Dishes Found
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchTerm && selectedCategory
                ? `We couldn't find any dishes matching "${searchTerm}" in the "${selectedCategory}" category.`
                : searchTerm
                ? `We couldn't find any dishes matching "${searchTerm}".`
                : selectedCategory
                ? `There are currently no dishes in the "${selectedCategory}" category.`
                : "It seems our menu is a bit empty here. Try a different search or category!"}
            </p>
            { (searchTerm || selectedCategory) &&
              <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedCategory(""); }}>
                Clear Filters & Search
              </Button>
            }
          </div>
        )}
      </main>
    </div>
  )
}

// Add this to your global CSS or a style tag if you don't have it elsewhere
// to hide scrollbar for category filters but keep functionality
/*
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/