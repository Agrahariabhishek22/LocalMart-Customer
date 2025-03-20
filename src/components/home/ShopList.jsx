import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const ShopList = () => {
    const { shopsByCategory, selectedCategory } = useSelector((state) => state.shops);
    const navigate = useNavigate();
    // console.log("Shops by Category:", shopsByCategory);
    // console.log("Selected Category:", selectedCategory);
  
    // Ensure shopsByCategory exists before accessing
    const shops = selectedCategory && shopsByCategory 
      ? shopsByCategory[selectedCategory] || [] 
      : [];
    // console.log(shops)
    const handleShopClick = (shopId) => {
        navigate(`/shop/${shopId}`);
    };
  return (
    <div className="flex-1 p-6  text-black dark:text-white">
      <h2 className="text-2xl font-semibold  mb-4">
        {selectedCategory ? `${selectedCategory} Shops` : "Select a Category"}
      </h2>
      {shops.length === 0 ? (
        <p>No shops available in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shops.map((shop) => (
            <div key={shop._id} 
            onClick={() => handleShopClick(shop._id)}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <img src={shop.shopImage} alt={shop.shopName} className="w-full h-40 object-cover rounded-lg" />
              <h4 className="text-lg font-semibold mt-2">{shop.shopName}</h4>
              <p className="text-gray-600">{shop.shopAddress}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopList;
