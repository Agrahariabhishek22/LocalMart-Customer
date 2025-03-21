import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App";
import Shops from "./pages/Shops";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfile";
import ShopDetails from "./components/shops/ShopDetails";
import Profile from "./pages/Profile";
import UpdateAddress from "./pages/UpdateAddress";
import Cart from "./pages/Cart";
import PrivateRoute from "./utils/PrivateRoute";
import PlaceOrder from "./pages/PlaceOrder";
import TestComponent from "./utils/TestComponent";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";

// import Payments from "./pages/Payments";
// import Coupons from "./pages/Coupons";
// import Returns from "./pages/Returns";
// import Support from "./pages/Support";
// import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shops", element: <Shops /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/cart", element: <Cart /> },
      { path: "/profile", element: <Profile /> },
      { path: "/shop/:shopId", element: <ShopDetails /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <Error />,
        children: [

          { index: true, element: <Navigate to="update-profile" replace /> }, // ✅ Relative Path
{ path: "update-profile", element: <UpdateProfile /> },

          { path: "orders", element: <Orders /> },
          { path: "update-address", element: <UpdateAddress /> },
          // { path: "wishlist", element: <Wishlist /> },

          // { path: "payments", element: <Payments /> },
          // { path: "coupons", element: <Coupons /> },
          // { path: "returns", element: <Returns /> },
          // { path: "support", element: <Support /> },
          // { path: "settings", element: <Settings /> },
        ],
      },
      {
        path: "/cart",
        element:<PrivateRoute><Cart /></PrivateRoute>,
       },
      {
        path: "/orders",
        element:<Orders />,
       },
      {
        path:'/wishlist',
        element:<Wishlist/>,
      },
      {
        path: "/place-order",
        element: <PlaceOrder/>,
       },
      {
        path: "/test",
        element: <TestComponent Component={PlaceOrder} />,
       },
    ],
  },
]);

const Routing = () => <RouterProvider router={router} />;

export default Routing;
