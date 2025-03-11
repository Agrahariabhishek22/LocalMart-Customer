import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import useAPI from "../hooks/useAPI";
import {setSelectedCategory, fetchShopsStart, fetchShopsSuccess, fetchShopsFailure } from "../redux/shopsSlice";
import Sidebar from "../components/home/Sidebar";
import ShopList from "../components/home/ShopList";
import { useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const { callApi,loading,error } = useAPI();
  const {  selectedCategory } = useSelector((state) => state.shops);
const [sidebarOpen,setSidebarOpen] = useState(false);
  useEffect(() => {
    const fetchShops = async () => {
      //dispatch(fetchShopsStart());
      const response = await callApi({ url: "api/owner/getAllShops",method:"GET" });4
      console.log(response)
      if (response) {
        dispatch(fetchShopsSuccess(response?.data));
       dispatch(setSelectedCategory(response?.data[0]?.shopCategory))
      } else {
       // dispatch(fetchShopsFailure("Failed to fetch shops"));
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
     <div
        className={`fixed top-16 md:top-0 overflow-y overflow-scroll pb-20 left-0 h-[100vh] w-64 md:w-80 bg-background-light dark:bg-background-dark shadow-xl p-6 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-60`}
      >
      <Sidebar  setSideBar={setSidebarOpen}  selectedCategory={selectedCategory}/>
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

export default HomePage;
