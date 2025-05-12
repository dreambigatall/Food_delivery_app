"use client"

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto mb-4">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          !selectedCategory ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            selectedCategory === category.id
              ? "bg-orange-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
