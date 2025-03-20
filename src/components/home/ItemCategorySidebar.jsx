import React from "react";

const ItemCategorySidebar = ({ categories, selectedCategory, onSelectCategory ,setSideBarOpen}) => {
  console.log(categories)
  return (
    <div className=" min-h-screen bg-gray-900 p-4">
      <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
      <ul>
        {categories?.map((category) => (
          <li
            key={category}
            className={`cursor-pointer p-2 rounded-md mb-2 ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => (onSelectCategory(category),setSideBarOpen(false))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemCategorySidebar;
