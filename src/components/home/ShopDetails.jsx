import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {fetchProductsSuccess} from "../../redux/shopsSlice"
//import { fetchShopProducts } from "../../redux/shopsSlice"; // Import the new action
import ItemCategorySidebar from "./ItemCategorySidebar";
import ItemList from "./ItemList";
import useAPI from "../../hooks/useAPI";

const ShopDetails = () => {
  const { shopId } = useParams();
  const dispatch = useDispatch();
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
const {callApi,loading,error} = useAPI();
  // Get shop details from Redux store
  const shop = useSelector((state) => {
    return Object.values(state.shops.shopsByCategory).flat().find((shop) => shop._id === shopId);
  });
 // console.log(shop)

  const productsByCategory = useSelector((state) => state.shops.productsByShop || {});

  const [selectedCategory, setSelectedCategory] = useState(Object.keys(productsByCategory)[0]);
//console.log( Object.keys(productsByCategory)[0])
  useEffect(() => {
    //if (!shopId ) return;
    console.log("use effect called")
    const fetchAllProducts = async () => {
      const response = await callApi({ url: `api/products/${shopId}` });
      //console.log(response)
      if (response?.success) {
        dispatch(fetchProductsSuccess({ shopId, products: response.data }));
      }
    };

    fetchAllProducts();
  }, []);

  if (!shop) return <p className="text-center text-gray-500">Shop not found</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Sidebar for Categories */}
      <div
        className={`fixed top-16 md:top-0 overflow-y-auto pb-20 left-0 h-[100vh] w-64 bg-background-light dark:bg-background-dark shadow-xl transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-60 z-100`}
      >
        <ItemCategorySidebar
          categories={shop?.itemCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          setSideBarOpen={setSidebarOpen}
        />
      </div>

      <button
        className="z-100 fixed bottom-0 md:hidden left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-t-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      {/* Shop Details & Items */}
      <div className="flex-1 p-6">
        {/* Shop Information */}
        <div className="bg-white text-gray-800 p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-blue-600">{shop?.shopName}</h2>
          <p className="text-gray-600">Owner: {shop?.ownerName}</p>
          <p className="text-gray-600">Address: {shop?.shopAddress}</p>
          <p className="text-gray-600">Contact: {shop?.mobileNumber}</p>
        </div>

        {/* Items List */}
        <ItemList items={productsByCategory[selectedCategory] || []} category={selectedCategory} shop={shop} />
      </div>
    </div>
  );
};

export default ShopDetails;
