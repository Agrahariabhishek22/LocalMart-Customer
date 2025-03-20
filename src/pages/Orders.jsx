import { useState, useEffect } from "react";
import useAPI from "../hooks/useAPI"; // Import your custom API hook
import OrderCard from "../components/common/OrderCard"; // Import OrderCard component

const Orders = () => {
  const { callApi, loading, error } = useAPI();
  const [orders, setOrders] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await callApi({ url: "api/order/customer" });
      console.log(response);
      
      if (response?.success) {
        const groupedOrders = groupOrdersByShop(response.orders);
        setOrders(groupedOrders);
        const shopNames = Object.keys(groupedOrders);
        setShops(shopNames);
        setSelectedShop(shopNames[0] || null);
      }
    };
    fetchOrders();
  }, []);

  const groupOrdersByShop = (orders) => {
    return orders.reduce((acc, order) => {
      const shopName = order.shopId.shopName;
      if (!acc[shopName]) acc[shopName] = [];
      acc[shopName].push(order);
      return acc;
    }, {});
  };

  return (
    <div className="flex min-h-screen p-5 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 dark:text-white">Shops</h2>
        <ul>
          {shops.map((shop) => (
            <li
              key={shop}
              onClick={() => setSelectedShop(shop)}
              className={`cursor-pointer p-2 rounded ${
                selectedShop === shop ? "bg-blue-500 text-white" : "dark:text-gray-200"
              }`}
            >
              {shop}
            </li>
          ))}
        </ul>
      </aside>

      {/* Orders Section */}
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold dark:text-white">{selectedShop} Orders</h2>

        {loading && <p className="text-gray-500">Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {selectedShop && orders[selectedShop] ? (
          <div className="space-y-6">
            {/* Processing Orders */}
            <div>
              <h3 className="text-lg font-semibold mt-4 dark:text-white border-b pb-2 border-gray-400">
                Processing Orders
              </h3>
              {orders[selectedShop].filter((order) => order.status === "Accepted").length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No processing orders.</p>
              ) : (
                orders[selectedShop]
                  .filter((order) => order.status === "Processing")
                  .map((order) => <OrderCard key={order._id} order={order} />)
              )}
            </div>

            {/* Pending Orders */}
            <div>
              <h3 className="text-lg font-semibold mt-4 dark:text-white border-b pb-2 border-yellow-500">
                Pending Orders
              </h3>
              {orders[selectedShop].filter((order) => order.status === "Pending").length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No pending orders.</p>
              ) : (
                orders[selectedShop]
                  .filter((order) => order.status === "Pending")
                  .map((order) => <OrderCard key={order._id} order={order} />)
              )}
            </div>

            {/* Delivered Orders */}
            <div>
              <h3 className="text-lg font-semibold mt-4 dark:text-white border-b pb-2 border-green-500">
                Delivered Orders
              </h3>
              {orders[selectedShop].filter((order) => order.status === "Delivered").length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No delivered orders.</p>
              ) : (
                orders[selectedShop]
                  .filter((order) => order.status === "Delivered")
                  .map((order) => <OrderCard key={order._id} order={order} />)
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
