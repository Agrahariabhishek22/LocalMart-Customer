import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Trash } from "lucide-react";
import toast from "react-hot-toast";
import EmptyState from "./EmptyState";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const handlePlaceOrder = (shopId) => {
    // console.log(shopId)
    // console.log("Navigating with shopId:", shopId);
    navigate("/place-order", { state: { shopId } });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-heading-dark dark:text-heading-light mb-4">
        Your Cart
      </h2>

      {Object.keys(cart).length === 0 ? (
        <EmptyState/>
      ) : (
        Object.entries(cart).map(([shopId, shopData]) => {
          const shopTotal = Object.values(shopData.items).reduce(
            (total, item) => total + item.quantity * item.offerPrice,
            0
          );

          return (
            <div key={shopId} className="bg-gray-800 dark:bg-gray-700 p-4 rounded-md mb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">{shopData.shopName}</h3>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => dispatch(clearCart(shopId))}
                >
                  Clear Shop Cart
                </button>
              </div>

              {Object.values(shopData.items).map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-700 dark:bg-gray-600 p-3 rounded-md my-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 mx-4">
                    <h4 className="text-white font-bold">{item.name}</h4>
                    <p className="text-green-400">₹{item.offerPrice}</p>
                    <p className="text-gray-400 text-sm">
                      Total: ₹{item.offerPrice * item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="bg-red-500 text-white p-1 rounded-md"
                      onClick={() =>
                        item.quantity === 1
                          ? dispatch(removeFromCart({ shopId, itemId: item._id }))
                          : dispatch(decreaseQuantity({ shopId, itemId: item._id }))
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      className="bg-green-500 text-white p-1 rounded-md"
                      onClick={() => dispatch(increaseQuantity({ shopId, itemId: item._id }))}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    className="text-red-400 hover:text-red-600 ml-2"
                    onClick={() => dispatch(removeFromCart({ shopId, itemId: item._id }))}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))}

              {/* Summary Section */}
              <div className="flex justify-between items-center bg-gray-900 dark:bg-gray-800 p-3 rounded-md mt-3">
                <p className="text-lg text-white font-semibold">Total: ₹{shopTotal}</p>
                <button
                  className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => handlePlaceOrder(shopId)}
                >
                  Place Order
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Cart;
