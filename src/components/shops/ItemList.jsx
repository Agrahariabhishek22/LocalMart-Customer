import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import { Heart } from "lucide-react";
import EmptyState from "../../pages/EmptyState";
import { toast } from "react-hot-toast";


const ItemList = ({ items, category, shop }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.customer.customer);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
const [search,setSearch] = useState("");
  const handleCartAction = (item) => {
    if (!user) {
      toast.error("Please Login first");
      return;
    }
    dispatch(addToCart({ shopId: shop._id, item: { ...item, shopName: shop.shopName } }));
  };
  
  const handleIncrease = (shopId, itemId) => {
    dispatch(increaseQuantity({ shopId, itemId }));
  };

  const handleDecrease = (shopId, itemId) => {
    dispatch(decreaseQuantity({ shopId, itemId }));
  };

  const handleWishlistToggle = (item) => {
    if (!user) {
      toast.error("Please Login first");
      return;
    }
    const isWishlisted = wishlist.some((wishItem) => wishItem.id === item._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(item._id));
    } else {
      dispatch(addToWishlist({ id: item._id, shopId: shop._id, shopName: shop.shopName, ...item }));
    }
  };

  if((Object.keys(items)).length === 0)return <div className="py-6 text-lg text-center"><EmptyState/></div>
  //console.log(items)
 if(search !== ""){
  items = items.filter((item)=>(
    item.name.toLowerCase().includes(search.toLowerCase().trim())
  ))
 }
  function debounce(fun,time){
    let timerId;
    return (value)=>{
      clearTimeout(timerId)
      setTimeout(()=>{
        fun(value)
      },time)
    }
  }
  const handleChange = debounce((value)=>{
   // console.log(value)
    setSearch(value)
  },800)

  return (
    <div className="  mt-6">
      
      <h3 className="text-2xl font-heading text-center  font-semibold text-heading-dark dark:text-heading-light mb-4">
        {category} Products
      </h3>

      {/* Search  */}
      <div className=" my-2 w-full max-w-2xl flex items-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-full shadow-md overflow-hidden">
        
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
         
          placeholder="Search  by product name ..."
          
          className="w-full p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
  
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items?.map((item) => {
  const isInCart = cart[shop._id]?.items[item._id];
  const isWishlisted = wishlist.some((wishItem) => wishItem.id === item._id);
  const isOutOfStock = item.quantity <= 0;

  return (
    <div 
      key={item._id} 
      className={`bg-gradient-to-br ${isOutOfStock && "opacity-50 bg-transparent"} from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 
                 text-paragraph-dark dark:text-paragraph-light p-3 rounded-md shadow-md relative`}
    >
      
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-20 md:h-40 border-2 border-background-dark dark:border-black object-cover rounded-md" 
      />
      <h4 className="text-sm md:text-lg font-bold mt-2 text-heading-light dark:text-heading-dark">
        {item.name}
      </h4>
      
      <div className="flex items-center gap-2">
        <p className="text-green-500 dark:text-green-400 font-semibold text-sm md:text-lg">
          ₹{item.offerPrice}
        </p>
        {item.discount > 0 && (
          <p className="text-gray-500 dark:text-red-400 line-through text-sm">
            ₹{item.salesPrice}
          </p>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isWishlisted ? "text-red-500" : "text-paragraph-dark dark:text-paragraph-light"
        } hover:text-red-500`}
        onClick={() => handleWishlistToggle(item)}
      >
        <Heart fill={`${isWishlisted ? "red" : "white"}`} />
      </button>

      {isOutOfStock ? (
        <button
          className="mt-2 w-full bg-red-500 text-white py-1 rounded-md cursor-not-allowed "
          disabled
        >
          Out of Stock
        </button>
      ) : isInCart ? (
        <div className="flex items-center justify-between mt-2 bg-blue-500 dark:bg-blue-600 text-white py-1 px-3 rounded-md">
          <button onClick={() => handleDecrease(shop._id, item._id)} className="text-lg px-2">-</button>
          <span>{isInCart.quantity}</span>
          <button onClick={() => handleIncrease(shop._id, item._id)} className="text-lg px-2">+</button>
        </div>
      ) : (
        <button
          className="mt-2 w-full bg-blue-500 dark:bg-blue-600 text-white py-1 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => handleCartAction(item)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
})}
      </div>
    </div>
  );
};

export default ItemList;
