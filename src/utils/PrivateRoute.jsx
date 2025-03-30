import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    console.log("PrivateRoute Rendered!"); // ✅ Check if this logs
    const user = useSelector((state) => state.customer.customer);
    console.log("User in PrivateRoute:", user); // ✅ Check user data
  
    return user ? children : <Navigate to="/" replace />;
  };
  
  
  export default PrivateRoute;
  