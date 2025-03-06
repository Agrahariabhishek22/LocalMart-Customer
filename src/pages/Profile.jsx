import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAPI from "../hooks/useAPI";
import {loginSuccess} from "../redux/customerSlice"
import { User, Lock, MapPin, Edit2 } from "lucide-react";

const Profile = () => {
  const { callApi } = useAPI();
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);

  const [formData, setFormData] = useState({
    name: customer?.name || "",
    oldPassword: "",
    newPassword: "",
    avatar: customer?.avatar || "",
    gender: customer?.gender || "",
    location: customer?.location || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prev) => ({
          ...prev,
          location: {
            coordinates: [position.coords.longitude, position.coords.latitude],
          },
        }));
      });
    }
  };

  const handleSubmit = async () => {
    const updatedFields = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );

    const response = await callApi({
      url: "api/customer/update/profile",
      method: "PUT",
      data: updatedFields,
      
    });
    if (response) {
      dispatch(loginSuccess(response.customer));
      alert("Profile updated successfully");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-xl p-8 border border-gray-300 dark:border-gray-700">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">Edit Profile</h2>
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-28 h-28">
          <img
            src={formData.avatar || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="w-full h-full rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-md object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600">
            <input type="file" className="hidden" accept="image/*" />
            <Edit2 size={18} className="text-white" />
          </label>
        </div>

        <div className="w-full">
          <label className="block text-gray-600 dark:text-gray-300 mb-1">Full Name</label>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
            <User size={20} className="text-gray-500" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent outline-none p-2" />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">Old Password</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <Lock size={20} className="text-gray-500" />
              <input type="password" name="oldPassword" onChange={handleChange} className="w-full bg-transparent outline-none p-2" />
            </div>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">New Password</label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <Lock size={20} className="text-gray-500" />
              <input type="password" name="newPassword" onChange={handleChange} className="w-full bg-transparent outline-none p-2" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <label className="block text-gray-600 dark:text-gray-300 mb-1">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="w-full flex items-center gap-4">
          <MapPin size={20} className="text-gray-500" />
          <button onClick={handleLocationUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update Location</button>
        </div>
      </div>
      <button onClick={handleSubmit} className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Save Changes</button>
    </div>
  );
};

export default Profile;
