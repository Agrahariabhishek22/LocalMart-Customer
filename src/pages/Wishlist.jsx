import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { removeFromWishlist } from "../redux/wishlistSlice";
import EmptyState from "./EmptyState";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ shopId: item.shopId, item }));
    dispatch(removeFromWishlist(item.id));
  };

  const groupedWishlist = wishlist.reduce((acc, item) => {
    if (!acc[item.shopName]) acc[item.shopName] = [];
    acc[item.shopName].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-900 dark:to-black p-2 md:p-6">
      <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-4 text-center">Wishlist</h2>

      {Object.keys(groupedWishlist).length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-lg text-center"><EmptyState message="You wish list is empty"/></p>
      ) : (
        Object.entries(groupedWishlist).map(([shopName, items]) => (
          <div key={shopName} className="mb-6">
            <h3 className="text-2xl font-semibold font-sub-heading text-center text-gray-800 dark:text-gray-200 mb-3">{shopName}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-1 md:p-3 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  <img src={item.image} alt={item.name} className="w-full h-32 md:h-40 object-cover rounded-md" />
                  <h4 className="text-lg font-bold mt-2 text-gray-900 dark:text-white">{item.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-green-600 dark:text-green-400 font-semibold text-lg">₹{item.offerPrice}</p>
                    {item.discount > 0 && (
                      <p className="text-gray-500 dark:text-gray-400 line-through text-sm">₹{item.salesPrice}</p>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      className="flex-1 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 text-white py-2 rounded-lg shadow-md hover:opacity-90"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="flex-1 bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 text-white py-2 rounded-lg shadow-md hover:opacity-90"
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;