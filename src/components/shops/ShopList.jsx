import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { MapPin } from "lucide-react";
import EmptyState from "../../pages/EmptyState";
const ShopList = () => {
    const { shopsByCategory, selectedCategory } = useSelector((state) => state.shops);
    const navigate = useNavigate();
    console.log(shopsByCategory)
    console.log(selectedCategory)
    // Ensure shopsByCategory exists before accessing
    const shops = selectedCategory && shopsByCategory 
      ? shopsByCategory[selectedCategory] || [] 
      : [];
    // console.log(shops)
    const handleShopClick = (shopId) => {
        navigate(`/shop/${shopId}`);
    };
  return (
    <div className="flex-1 pl-10 p-2 md:p-6  text-black dark:text-white">
      <h2 className="text-2xl text-center font-semibold font-heading  mb-4">
        {selectedCategory ? `${selectedCategory} Shops` : "Select a Category"}
      </h2>
      {shops.length === 0 ? (
       <EmptyState/>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {shops.map((shop) => (
  <div
  key={shop._id}
  onClick={() => handleShopClick(shop._id)}
  className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 
             p-2 md:p-3 rounded-xl shadow-lg transition-all duration-300 
             hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col items-center"
>
  {/* Image */}
  <img
    src={shop.shopImage}
    alt={shop.shopName}
    className="w-full h-20 md:h-32 object-cover border-2 border-gray-300 dark:border-gray-700 
               hover:border-blue-500 transition-all duration-300 rounded-lg"
  />

  {/* Shop Name */}
  <h4 className="text-[15px] font-sub-heading md:text-lg font-semibold mt-2 text-gray-900 dark:text-white text-center">
    {shop.shopName}
  </h4>

  {/* Address */}
  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1 text-center">
    {shop.shopAddress}
  </p>

  {/* Centered Visit Button */}
  <button className="mt-3 flex items-center justify-center w-full px-4 py-2 text-sm md:text-base font-semibold 
                      text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 
                      dark:from-blue-600 dark:to-purple-600 
                      hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
    <MapPin size={18} /> Visit
  </button>
</div>

  ))}
</div>

      )}
    </div>
  );
};

export default ShopList;
