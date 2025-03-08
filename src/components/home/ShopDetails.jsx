import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAPI from "../../hooks/useAPI";
import ItemCategorySidebar from "./ItemCategorySidebar";
import ItemList from "./ItemList";

const ShopDetails = () => {
  const { shopId } = useParams();
  const { callApi } = useAPI();
  const [shop, setShop] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchShopDetails = async () => {
      const response = await callApi({ url: `api/owner/${shopId}` });
      if (response?.success) {
        setShop(response.data);
        setSelectedCategory(response.data.itemCategories?.[0] || null); // Default to first category
      }
    };
    fetchShopDetails();
  }, [shopId]);

  useEffect(() => {
    if (!selectedCategory) return;
    const fetchItems = async () => {
      const response = await callApi({
        url: `api/product/${shopId}/items?category=${selectedCategory}`,
      });
      if (response?.success) {
        setItems(response.data);
      }
    };
    fetchItems();
  }, [selectedCategory]);

  if (!shop) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Sidebar for Categories */}
      <ItemCategorySidebar
        categories={shop.itemCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Shop Details & Items */}
      <div className="flex-1 p-6">
        {/* Shop Information */}
        <div className="bg-white text-gray-800 p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-blue-600">{shop.shopName}</h2>
          <p className="text-gray-600">Owner: {shop.ownerName}</p>
          <p className="text-gray-600">Address: {shop.address}</p>
          <p className="text-gray-600">Contact: {shop.contact}</p>
        </div>

        {/* Items List */}
        <ItemList items={items} category={selectedCategory} shop={shop}/>
      </div>
    </div>
  );
};

export default ShopDetails;
