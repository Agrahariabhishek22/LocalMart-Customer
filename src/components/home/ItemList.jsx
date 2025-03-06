import React from "react";

const ItemList = ({ items, category }) => {
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-white mb-4">{category} Items</h3>
      {items.length === 0 ? (
        <p className="text-gray-300">No items available in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white text-gray-800 p-3 rounded-md shadow-md">
              <h4 className="text-lg font-bold text-blue-600">{item.name}</h4>
              <p className="text-gray-600">Price: ₹{item.price}</p>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
