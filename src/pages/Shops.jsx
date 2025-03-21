import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAPI from "../hooks/useAPI";
import {
  setSelectedCategory,
  fetchShopsStart,
  fetchShopsSuccess,
  fetchShopsFailure,
} from "../redux/shopsSlice";
import Sidebar from "../components/shops/Sidebar";
import ShopList from "../components/shops/ShopList";
import { useSelector } from "react-redux";
import CardSkeleton from "../components/common/CardSkeleton";
const Shops = () => {
  const dispatch = useDispatch();
const [loading,setLoading] = useState(false)
  const { callApi,error } = useAPI();
  const {  selectedCategory } = useSelector((state) => state.shops);
const [sidebarOpen,setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          console.log(position.coords)
          const response = await callApi({ 
            url: `api/owner/getAllShops?latitude=${latitude}&longitude=${longitude}`, 
            method: "GET" 
          });
  
          console.log(response);
          
          if (response) {
            dispatch(fetchShopsSuccess(response?.data));
            if(!selectedCategory)dispatch(setSelectedCategory(response?.data[0]?.shopCategory));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
       
      );
      setLoading(false)
    };
  
    fetchShops();
  }, []);
  
if(loading){
  return <CardSkeleton/>
}
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <div
        className={`fixed top-16 md:top-0 overflow-y overflow-scroll pb-20 left-0 h-[100vh] w-64 md:w-80 bg-background-light dark:bg-background-dark shadow-xl p-6 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-60`}
      >
        <Sidebar
          setSideBar={setSidebarOpen}
        />
      </div>
      <ShopList />
      <button
        className="z-100 fixed bottom-0 md:hidden left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-t-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
    </div>
  );
};

export default Shops;
