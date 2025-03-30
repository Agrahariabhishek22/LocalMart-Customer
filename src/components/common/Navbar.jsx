import { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/customerSlice";
import {LogOut,ShoppingBasket, User, ShoppingCart, Heart, ClipboardList, LayoutDashboard, Info, Phone, Package, LogIn, UserPlus, Menu, X,  Sun, Moon, } from "lucide-react";
import NotificationBell from "./Notification";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const dispatch = useDispatch();
  const { isAuthenticated, customer } = useSelector((state) => state.customer);
const location = useLocation();
const currentPath = location.pathname
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear(); 
    sessionStorage.clear();
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
  dispatch(logoutSuccess());
  window.location.href = "/login";
  };

  return (
    <nav className="sticky z-50 top-0 dark:bg-background-dark border-b-2 border-b-black dark:border-b-white bg-background-light shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-black dark:text-white text-xl font-bold">
            ShopEase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className={`text-black dark:text-white px-3 py-2 rounded-md ${currentPath === "/" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>Shops</Link>
            <Link to="/about" className={`text-black dark:text-white px-3 py-2 rounded-md ${currentPath === "/about" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>About</Link>
           {/*  <NotificationBell /> */}
            <Link to="/contact" className={`text-black dark:text-white px-3 py-2 rounded-md ${currentPath === "/contact" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>Contact</Link>
            {!isAuthenticated&&(
              <>
              <Link to="/login" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/login" ? "bg-blue-500 text-white" : "hover:opacity-90 dark:hover:opacity-90 bg-red-500 "}`}>
                <LogIn size={20} /> Login
              </Link>
              <Link to="/signup" className="flex items-center gap-3 p-2  text-background-dark dark:text-background-light rounded-lg text-center justify-center hover:opacity-90 bg-blue-500 ">
                <UserPlus size={20} /> Create Account
              </Link>
            </>
            )
            }
            {isAuthenticated && (
              <>
                             

                <Link to="/orders" className={`text-black dark:text-white px-3 py-2 rounded-md ${currentPath === "/orders" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>Orders</Link>
                <Link to="/wishlist" className={`text-black dark:text-white px-3 py-2 rounded-md ${currentPath === "/wishlist" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>Wishlist</Link>
                <Link to="/dashboard" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard/update-profile" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
                Dashboard
              </Link>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
          <Link to="/cart"  className="text-black dark:text-white">
            <ShoppingCart size={20} /> 
          </Link>
            <button onClick={() => setDarkMode(!darkMode)} className="text-black dark:text-white">
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <NotificationBell className="md:hidden" />
            <button className="md:hidden text-black dark:text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden grid grid-cols-2 dark:bg-background-dark bg-background-light p-4 shadow-lg rounded-lg space-y-2 text-base font-medium dark:text-white text-black">
          <Link to="/cart" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/cart" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
            <ShoppingCart size={20} /> Cart
          </Link>
          <Link to="/about" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/about" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
            <Info size={20} /> About
          </Link>
          <Link to="/contact" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/contact" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
            <Phone size={20} /> Contact
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard/update-profile" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              <Link to="/orders" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/orders" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
                <ClipboardList size={20} /> Orders
              </Link>
              <Link to="/wishlist" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/wishlist" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
                <Heart size={20} /> Wishlist
              </Link>
              <Link to="/profile" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/profile" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
                <User size={20} /> Profile
              </Link>
              <Link to="/shops" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/shops" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
                <ShoppingBasket size={20} /> Shops
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/login" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
                <LogIn size={20} /> Login
              </Link>
              <Link to="/signup" className="flex items-center gap-3 p-2 bg-heading-dark dark:bg-heading-light text-background-dark dark:text-background-light rounded-lg text-center justify-center hover:opacity-90">
                <UserPlus size={20} /> Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
