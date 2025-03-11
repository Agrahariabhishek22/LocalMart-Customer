import { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/customerSlice";
import {LogOut, User, ShoppingCart, Heart, ClipboardList, LayoutDashboard, Info, Phone, Package, LogIn, UserPlus, Menu, X,  Sun, Moon, } from "lucide-react";


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
    <nav className="sticky z-200 top-0 dark:bg-background-dark border-b-2 border-b-black dark:border-b-white bg-background-light shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-black dark:text-white text-xl font-bold">
            ShopEase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-black dark:text-white">
              Shops
            </Link>
            <Link to="/about" className="text-black dark:text-white">
              About
            </Link>
            <Link to="/contact" className="text-black dark:text-white">
              Contact
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/orders" className="text-black dark:text-white">
                  Orders
                </Link>
                <Link to="/wishlist" className="text-black dark:text-white">
                  Wishlist
                </Link>
              </>
            )}
          </div>

          {/* Actions: Cart, Auth, Theme Toggle */}
          <div className="flex items-center justify-between gap-4 w-[250px]">

            <button onClick={() => setDarkMode(!darkMode)} className="text-black dark:text-white  ml-10 md:ml-0">
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}

           
            </button>
            {isAuthenticated ? (
              <div className="hidden md:flex w-[200px] items-center justify-between ">
                <Link to="/cart" className="text-black dark:text-white">
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                <Link to="/dashboard" className="text-black dark:text-white">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-black dark:text-white">
                  <User className="w-6 h-6" />
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition">
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
                  Login
                </Link>
                <Link to="/signup" className="bg-heading-dark dark:bg-heading-light text-background-dark dark:text-background-light px-4 py-2 rounded-lg">
                  Create Account
                </Link>
              </>
            )}
            <button className="md:hidden dark:text-white text-black" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
      <div className="md:hidden dark:bg-background-dark bg-background-light p-4 shadow-lg rounded-lg space-y-1 text-base font-medium dark:text-white text-black grid grid-cols-2">
        <Link to="/products" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard/products" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
          <Package size={20} /> Products
        </Link>
        <Link to="/about" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard/about" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
          <Info size={20} /> About
        </Link>
        <Link to="/contact" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard/contact" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
          <Phone size={20} /> Contact
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/orders" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard/orders" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
              <ClipboardList size={20} /> Orders
            </Link>
            <Link to="/wishlist" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard/wishlist" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
              <Heart size={20} /> Wishlist
            </Link>
            <Link to="/profile" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard/profile" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
              <User size={20} /> Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-red-500 hover:text-white dark:hover:bg-red-600"
            >
              <LogOut size={20} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/dashboard/login" className={`flex items-center gap-3 p-2 rounded-lg ${currentPath === "/dashboard/login" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
              <LogIn size={20} /> Login
            </Link>
            <Link
              to="/dashboard/signup"
              className={`flex items-center gap-3 p-2 bg-heading-dark dark:bg-heading-light text-background-dark dark:text-background-light rounded-lg text-center justify-center hover:opacity-90 ${currentPath === "/dashboard/signup" ? "bg-gray-400 dark:bg-gray-600" : ""}`}
            >
              <UserPlus size={20} /> Create Account
            </Link>
          </>
        )}
      </div>
    )
  
  }
    </nav>
  );
};

export default Navbar;
