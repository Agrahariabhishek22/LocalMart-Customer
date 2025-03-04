import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ErrorPage = () => {
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
    <div className={`flex flex-col items-center justify-center min-h-screen bg-background-dark dark:bg-background-light text-heading-dark dark:text-heading-light`}>
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-subheading-dark dark:text-subheading-light mt-4">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-heading-dark dark:bg-heading-light text-background-dark dark:text-background-light rounded-lg shadow-md hover:bg-subheading-dark dark:hover:bg-subheading-light transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
