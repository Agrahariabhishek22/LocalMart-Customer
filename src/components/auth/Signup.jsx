import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../hooks/useAPI";

const statesInIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Signup = () => {
  const navigate = useNavigate();
  const { callApi, loading } = useAPI();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    mobileNumber: "",
    avatar: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
    },
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email.match(/\S+@\S+\.\S+/)) tempErrors.email = "Invalid email";
    if (formData.password.length < 8) tempErrors.password = "Password must be at least 8 characters";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.mobileNumber.match(/^\d{10}$/)) tempErrors.mobileNumber = "Invalid mobile number";
    if (!formData.address.street) tempErrors.street = "Street is required";
    if (!formData.address.city) tempErrors.city = "City is required";
    if (!formData.address.state) tempErrors.state = "State is required";
    if (!formData.address.postalCode.match(/^\d{5,6}$/)) tempErrors.postalCode = "Invalid postal code";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({ ...formData, address: { ...formData.address, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const res = await callApi({ url: "api/customer/signup", method: "POST", data: formData });
    if (res?.success) {
      toast.success("Registered successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Sign Up</h2>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) =>
            key !== "address" && key !== "avatar" ? (
              <div key={key}>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {key === "gender" ? (
                  <select name={key} value={value} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <input
                    type={key === "password" ? "password" : "text"}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    required
                  />
                )}
                {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
              </div>
            ) : null
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Address</h3>
            {Object.entries(formData.address).map(([key, value]) => (
              <div key={key}>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {key === "state" ? (
                  <select name={key} value={value} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition">
                    <option value="">Select State</option>
                    {statesInIndia.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    required
                  />
                )}
                {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
