import { useState } from "react";
import { useDispatch } from "react-redux";
// import { loginUser } from "../redux/authSlice";

const LoginForm = () => {
  //   const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newErrors = {};
    if (!credentials.identifier)
      newErrors.identifier = "Email or mobile number is required";
    if (!credentials.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Get geolocation before sending login request
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          try {
            await dispatch(loginUser({ ...credentials, location })); // Send location to backend
          } catch (error) {
            console.error("Login failed", error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-dark dark:bg-background-light">
      <div className="bg-heading-light dark:bg-heading-dark p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-heading-dark dark:text-heading-light text-center">
          Login
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-subheading-dark dark:text-subheading-light mb-1">
              Email or Mobile Number
            </label>
            <input
              type="text"
              name="identifier"
              value={credentials.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background-light dark:bg-background-dark 
             text-heading-light dark:text-heading-dark 
             border border-subheading-dark dark:border-subheading-light 
             rounded-lg focus:outline-none focus:ring-2 
             focus:ring-subheading-dark dark:focus:ring-subheading-light"
              required
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
            )}
          </div>
          <div>
            <label className="block text-subheading-dark dark:text-subheading-light mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background-light dark:bg-background-dark 
             text-heading-light dark:text-heading-dark 
             border border-subheading-dark dark:border-subheading-light 
             rounded-lg focus:outline-none focus:ring-2 
             focus:ring-subheading-dark dark:focus:ring-subheading-light"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-heading-dark dark:bg-heading-light text-background-dark dark:text-background-light rounded-lg shadow-md hover:bg-subheading-dark dark:hover:bg-subheading-light transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-subheading-dark dark:text-subheading-light mt-4">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-heading-dark dark:text-heading-light font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
