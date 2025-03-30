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
  
      const response = await callApi({ 
        url: `api/owner/getAllShops`, 
        method: "GET" 
      });

      console.log(response);
      
      if (response) {
        dispatch(fetchShopsSuccess(response?.data));
        if(!selectedCategory)dispatch(setSelectedCategory(response?.data[0]?.shopCategory));
      }
       
       setLoading(false)
    };
  
    fetchShops();
  }, []);
  
if(loading){
  return <CardSkeleton/>
}
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-700">
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
        className="z-100 fixed left-0 md:hidden  top-1/2  transform  -translate-x-14 rotate-90 bg-gradient-to-r from-blue-500 to-purple-500  text-white px-4 py-2 rounded-t-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Categories" : "Open Categories"}
      </button>
      
    </div>
  );
};

export default Shops;




// const SidebarToggle = ({ setSidebarOpen, sidebarOpen }) => {
//   const [buttonPosition, setButtonPosition] = useState(50); // Initial position (50% from top)

//   return (
//     <div className="fixed left-0 flex flex-col items-center space-y-2">
//       {/* Move Up Button */}
//       <button
//         className="bg-gray-700 text-white px-2 py-1 rounded shadow"
//         onClick={() => setButtonPosition((prev) => Math.max(prev - 10, 10))} // Prevents going too high
//       >
//         ▲
//       </button>

//       {/* Sidebar Toggle Button */}
//       <button
//         className="z-50 fixed left-0 transform -translate-x-11 rotate-90 bg-blue-500 text-white px-4 py-2 rounded-t-lg shadow-lg"
//         style={{ top: `${buttonPosition}%` }} // Dynamic top position
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
//       </button>

//       {/* Move Down Button */}
//       <button
//         className="bg-gray-700 text-white px-2 py-1 rounded shadow"
//         onClick={() => setButtonPosition((prev) => Math.min(prev + 10, 90))} // Prevents going too low
//       >
//         ▼
//       </button>
//     </div>
//   );
// };

// export default SidebarToggle;
