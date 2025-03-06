import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/customerSlice";
import {
  Moon,
  Sun,
  LogOut,
  User,
  ShoppingBag,
  MapPin,
  Heart,
  CreditCard,
  Gift,
  RotateCcw,
  MessageSquare,
  Settings,
} from "lucide-react";

const Sidebar = ({ toggleDarkMode, darkMode }) => {
  const menuItems = [
    { name: "Profile", icon: <User size={20} />, path: "profile" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "orders" },
    { name: "Addresses", icon: <MapPin size={20} />, path: "addresses" },
    { name: "Wishlist", icon: <Heart size={20} />, path: "wishlist" },
    { name: "Payments", icon: <CreditCard size={20} />, path: "payments" },
    { name: "Coupons", icon: <Gift size={20} />, path: "coupons" },
    { name: "Returns", icon: <RotateCcw size={20} />, path: "returns" },
    { name: "Support", icon: <MessageSquare size={20} />, path: "support" },
    { name: "Settings", icon: <Settings size={20} />, path: "settings" },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 p-6 text-paragraph-light dark:text-paragraph-dark min-h-screen flex flex-col justify-between shadow-lg rounded-r-lg">
      <div>
        <h2 className="text-heading-light dark:text-heading-dark text-2xl font-semibold mb-6">
          Dashboard
        </h2>
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path} // ✅ Using relative path for nested routing
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-4 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />} Toggle Dark Mode
        </button>
        <button
          onClick={() => dispatch(logoutSuccess())}
          className="w-full flex items-center gap-4 p-4 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="flex">
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main className="flex-1 p-8 bg-gradient-to-b from-background-light to-gray-200 dark:from-background-dark dark:to-gray-900 min-h-screen shadow-lg rounded-lg">
        <Outlet /> {/* ✅ This ensures nested routes render here */}
      </main>
    </div>
  );
};

export default Dashboard;
