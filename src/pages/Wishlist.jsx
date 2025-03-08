import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { removeFromWishlist } from "../redux/wishlistSlice";

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
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-heading-dark dark:text-heading-light mb-4">Wishlist</h2>

      {Object.keys(groupedWishlist).length === 0 ? (
        <p className="text-paragraph-dark dark:text-paragraph-light text-lg text-center">Your wishlist is empty.</p>
      ) : (
        Object.entries(groupedWishlist).map(([shopName, items]) => (
          <div key={shopName} className="mb-6">
            <h3 className="text-2xl font-semibold text-heading-dark dark:text-heading-light mb-3">{shopName}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-background-light dark:bg-background-dark p-3 rounded-md shadow-md">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
                  <h4 className="text-lg font-bold mt-2 text-heading-dark dark:text-heading-light">{item.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-green-500 dark:text-green-400 font-semibold text-lg">₹{item.offerPrice}</p>
                    {item.discount > 0 && (
                      <p className="text-gray-500 dark:text-gray-400 line-through text-sm">₹{item.salesPrice}</p>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      className="flex-1 bg-blue-500 dark:bg-blue-600 text-white py-1 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="flex-1 bg-red-500 dark:bg-red-600 text-white py-1 rounded-md hover:bg-red-600 dark:hover:bg-red-700"
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
