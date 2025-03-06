import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAPI from "../hooks/useAPI";
import { fetchShopsStart, fetchShopsSuccess, fetchShopsFailure } from "../redux/shopsSlice";
import Sidebar from "../components/home/Sidebar";
import ShopList from "../components/home/ShopList";

const HomePage = () => {
  const dispatch = useDispatch();
  const { callApi } = useAPI();

  useEffect(() => {
    const fetchShops = async () => {
      dispatch(fetchShopsStart());
      const data = await callApi({ url: "api/owner/getAllShops",method:"GET" });
      if (data) {
        dispatch(fetchShopsSuccess(data.data));
      } else {
        dispatch(fetchShopsFailure("Failed to fetch shops"));
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <ShopList />
    </div>
  );
};

export default HomePage;
