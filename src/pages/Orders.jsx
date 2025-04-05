import { useState, useEffect } from "react";
import useAPI from "../hooks/useAPI";
import OrderCard from "../components/common/OrderCard";
import EmptyState from "./EmptyState";
import CardSkeleton from "../components/common/CardSkeleton";

const Orders = () => {
  const { callApi, loading, error } = useAPI();
  const [orders, setOrders] = useState({});
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const groupOrdersByShop = (orders) => {
    return orders.reduce((acc, order) => {
      const shopName = order.shopId.shopName;
      if (!acc[shopName]) acc[shopName] = [];
      acc[shopName].push(order);
      return acc;
    }, {});
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await callApi({ url: "api/order/customer" });
      console.log(response)
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
  if(loading){
    return <div className="flex justify-center items-center dark:bg-gray-900"><CardSkeleton/></div>
  }
  
  const filteredOrders = selectedShop
    ? orders[selectedShop].filter((order) =>
        selectedStatus === "All" ? true : order.status === selectedStatus
      )
    : [];

  return (

    <div className=" flex min-h-screen p-5 dark:bg-gray-900">
      {/* Sidebar Toggle Button */}
      <button
        className="z-50 fixed left-0 md:hidden top-1/2 transform -translate-x-11 rotate-90 
                   bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 
                   rounded-t-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      {/* Sidebar */}
      <aside
        className={` fixed md:relative z-40 w-64 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg 
                    transition-all duration-300 ${sidebarOpen ? "left-0" : "-left-64"} md:left-0`}
      >
        <h2 className="text-lg text-center font-heading font-semibold mb-3 dark:text-white">Shops</h2>
        <ul>
          {shops.map((shop) => (
            <li
              key={shop}
              onClick={() => {
                setSelectedShop(shop);
                setSelectedStatus("All");
                setSidebarOpen(false);
              }}
              className={`cursor-pointer font-sub-heading p-2 rounded ${
                selectedShop === shop ? "bg-blue-500 text-white" : "dark:text-gray-200"
              }`}
            >
              {shop}
            </li>
          ))}
        </ul>
      </aside>

      {/* Orders Section */}
      <div className="w-full md:w-3/4 p-4">
        {selectedShop ? (
          <>
            {/* Shop Header */}
            <h2 className="text-xl text-center font-heading font-bold dark:text-white">{selectedShop} Orders</h2>

            {/* Order Status Tabs */}
            <div className="flex flex-wrap gap-4 mt-4">
              {["All", "Delivered", "Pending", "Cancelled","Accepted"].map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 font-sub-heading rounded-lg transition-all duration-300 
                              ${
                                selectedStatus === status
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Order List */}
            {loading && <p className="text-gray-500">Loading orders...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {filteredOrders.length > 0 ? (
              <div className="space-y-4 mt-4">
                {filteredOrders.map((order) => (
                  <OrderCard key={order._id} order={order} className="bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 p-3 rounded-lg shadow-lg"/>
                ))}
              </div>
            ) : (
              <EmptyState/>
            )}
          </>
        ) : (
          <EmptyState/>
        )}
      </div>
    </div>
  );
};

export default Orders;
