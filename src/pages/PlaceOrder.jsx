import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
import useAPI from "../hooks/useAPI"; // Import the custom API hook
import { buyProducts } from "../services/paymentIntegration";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { callApi,loading,error } = useAPI(); // Use API hook

  const cart = useSelector((state) => state.cart);
  const customer = useSelector((state) => state.customer.customer);

  const savedAddresses = customer?.address || []; // Get addresses from Redux
  const shopId = location.state?.shopId; // Get shop ID from navigation state
  const shopData = cart[shopId] || [];

  const [selectedAddress, setSelectedAddress] = useState(
    savedAddresses.find((addr) => addr.isDefault) || savedAddresses[0] || null
  );
  const [paymentMethod, setPaymentMethod] = useState("");

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`;
  };

 
const formatProducts = (shopData) => {
    console.log(shopData);
    if (!shopData || typeof shopData !== "object") return [];

    const formattedProducts = Object.values(shopData.items).map((item) => {
         return {
            productId: item._id,
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            price: item.offerPrice,
        };
    });

    return formattedProducts;
};
  

  const handleOrderPlacement = async () => {
    if (!selectedAddress) return toast.error("Please select an address.");
    if (!paymentMethod) return toast.error("Please select a payment method.");
    const products = formatProducts(shopData);
    const totalAmount = products.reduce((sum, item) => sum + item.price * item.quantity, 0); // Ensure correct total

    const orderData = {
      name:customer.name,
      customerId: customer._id,
      shopId,
      products,
      paymentMethod,
      deliveryAddress: formatAddress(selectedAddress),
    };

    //console.log("Before UPI payment");

    if (paymentMethod !== "COD") {
        await buyProducts(totalAmount, navigate, dispatch, callApi, orderData);
    } else {
        console.log("Placing order for COD");
        const response = await callApi({
            url: "api/order/",
            method: "POST",
            data: orderData,
        });

        if (response) {
            toast.success("🎉 Order Placed Successfully!");
            dispatch(clearCart(shopId));
            setTimeout(() => navigate("/orders"), 1500);
        } else {
            toast.error("Failed to place order. Try again.");
        }
    }
  };

  return (
    <div className="dark:bg-gray-600 p-4 h-[100vh] w-[100vw]">
      <h2 className="text-2xl font-bold text-heading-light dark:text-heading-dark mb-4">
        Checkout
      </h2>

      {/* Address Selection */}
      <div className="bg-gray-800 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-white">Select Address</h3>

        {savedAddresses.length === 0 ? (
          <p className="text-gray-400">No saved addresses.</p>
        ) : (
          savedAddresses.map((addr, index) => (
            <div
              key={index}
              className={`p-3 border rounded-md cursor-pointer my-2 ${
                selectedAddress === addr ? "border-blue-500 bg-gray-700" : "border-gray-500"
              }`}
              onClick={() => setSelectedAddress(addr)}
            >
              <p className="text-white">{formatAddress(addr)}</p>
            </div>
          ))
        )}

        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={() => navigate("/dashboard/addresses")}
        >
          Add New Address
        </button>
      </div>

      {/* Payment Selection */}
      <div className="bg-gray-800 dark:bg-gray-700 p-4 rounded-md mt-6">
        <h3 className="text-lg font-semibold text-white">Select Payment Method</h3>

        <div className="mt-3">
          <label className="block cursor-pointer text-black dark:text-white">
            <input type="radio" name="payment" value="COD"  onChange={() => setPaymentMethod("COD")} /> COD
          </label>
          <label className="block cursor-pointer mt-2  text-black dark:text-white">
            <input type="radio" name="payment" value="UPI" onChange={() => setPaymentMethod("UPI")} /> UPI
          </label>
        </div>
      </div>

      {/* Confirm Order Button */}
      <button
        className="bg-blue-500 text-center text-white px-4 py-2 rounded-md mt-6 w-full"
        onClick={handleOrderPlacement}
      >
        {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" />
            ):"Confirm Order" }
        
      </button>
    </div>
  );
};

export default PlaceOrder;
