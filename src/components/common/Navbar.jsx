import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/customerSlice";
import { Menu, X, ShoppingCart, Sun, Moon, LogOut, User, Heart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const dispatch = useDispatch();
  const { isAuthenticated, customer } = useSelector((state) => state.customer);

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
    <nav className="bg-background-dark dark:bg-background-light shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-heading-dark dark:text-heading-light text-xl font-bold">
            ShopEase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/products" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
              Shops
            </Link>
            <Link to="/about" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
              About
            </Link>
            <Link to="/contact" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
              Contact
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/orders" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
                  Orders
                </Link>
                <Link to="/wishlist" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
                  Wishlist
                </Link>
              </>
            )}
          </div>

          {/* Actions: Cart, Auth, Theme Toggle */}
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="text-paragraph-dark dark:text-paragraph-light">
              {darkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="text-paragraph-dark dark:text-paragraph-light">
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                <Link to="/dashboard" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-paragraph-dark dark:text-paragraph-light">
                  <User className="w-6 h-6" />
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition">
                  <LogOut className="w-6 h-6" />
                </button>
              </>
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
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background-dark dark:bg-background-light p-4 space-y-2 shadow-md">
          <Link to="/products" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
            Products
          </Link>
          <Link to="/about" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
            About
          </Link>
          <Link to="/contact" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
                Dashboard
              </Link>
              <Link to="/orders" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
                Orders
              </Link>
              <Link to="/wishlist" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
                Wishlist
              </Link>
              <Link to="/profile" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
                Profile
              </Link>
              <button onClick={handleLogout} className="block text-red-500 hover:text-red-600 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
                Login
              </Link>
              <Link to="/signup" className="block bg-heading-dark dark:bg-heading-light text-background-dark dark:text-background-light px-4 py-2 rounded-lg text-center">
                Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
