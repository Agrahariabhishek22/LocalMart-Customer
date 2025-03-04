import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 const [darkMode, setDarkMode] = useState(
     localStorage.getItem("theme") === "dark"
   );
 
   useEffect(() => {
     if (darkMode) {
       document.documentElement.classList.add("dark");
     } else {
       document.documentElement.classList.remove("dark");
     }
     localStorage.setItem("theme", darkMode ? "dark" : "light");
   }, [darkMode]);
 

  return (
    <nav className={`bg-background-dark dark:bg-background-light shadow-md ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-heading-dark dark:text-heading-light text-xl font-bold">
            ShopEase
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
              Dashboard
            </Link>
            <Link to="/products" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
              Products
            </Link>
            <Link to="/about" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
              About
            </Link>
            <Link to="/contact" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
              Contact
            </Link>
          </div>

          {/* Actions: Cart, Auth, Theme Toggle */}
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="text-paragraph-dark dark:text-paragraph-light">
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <Link to="/cart" className="text-paragraph-dark dark:text-paragraph-light">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <Link to="/login" className="text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
              Login
            </Link>
            <Link to="/signup" className="bg-heading-dark dark:bg-heading-light text-background-dark dark:text-background-light px-4 py-2 rounded-lg">
              Create Account
            </Link>
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background-dark dark:bg-background-light p-4 space-y-2 shadow-md">
          <Link to="/dashboard" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
            Dashboard
          </Link>
          <Link to="/products" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
            Products
          </Link>
          <Link to="/about" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
            About
          </Link>
          <Link to="/contact" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
            Contact
          </Link>
          <Link to="/login" className="block text-paragraph-dark dark:text-paragraph-light hover:text-subheading-dark dark:hover:text-subheading-light">
            Login
          </Link>
          <Link to="/signup" className="block bg-heading-dark dark:bg-heading-light text-background-dark dark:text-background-light px-4 py-2 rounded-lg text-center">
            Create Account
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
