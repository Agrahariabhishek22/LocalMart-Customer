import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHome, FaGlobe } from "react-icons/fa";

const UserProfile = ({ user }) => {
  const { name, email, mobileNumber, location, address } = user;
  //const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.coordinates[1]},${location.coordinates[0]}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 p-6">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 max-w-lg w-full text-center">
        {/* Avatar */}
        <div className="w-24 h-24 mx-auto mb-4">
          <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-3xl">
            <FaUser />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{name}</h2>

        {/* Contact Details */}
        <div className="mt-4 text-gray-700 dark:text-gray-300 space-y-3">
          <div className="flex items-center gap-2 justify-center">
            <FaEnvelope className="text-blue-500 dark:text-blue-400" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FaPhone className="text-green-500 dark:text-green-400" />
            <span>{mobileNumber}</span>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-6 text-gray-900 dark:text-gray-100">
          <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
            <FaHome className="text-purple-500 dark:text-purple-400" />
            Addresses
          </h3>

          <div className="mt-2 space-y-4">
            {address.map((address, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-200 dark:bg-gray-800 shadow-md text-left"
              >
                <p><strong>Street:</strong> {address.street}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>State:</strong> {address.state}</p>
                <p><strong>Country:</strong> {address.country}</p>
                <p><strong>Postal Code:</strong> {address.postalCode}</p>
                {address.isDefault && (
                  <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    Default Address
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Google Maps Location */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold flex items-center justify-center gap-2 text-gray-800 dark:text-gray-200">
            <FaMapMarkerAlt className="text-red-500 dark:text-red-400" />
            Location
          </h3>
          <iframe
            className="mt-2 w-full rounded-lg shadow-lg"
            width="100%"
            height="200"
            style={{ border: "none" }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3570.624735362084!2d80.27911047542528!3d26.500024976895574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDMwJzAwLjEiTiA4MMKwMTYnNTQuMSJF!5e0!3m2!1sen!2sin!4v1741094749090!5m2!1sen!2sin"
            ></iframe>
        </div>
      </div>
    </div>
  );
};

// Example User Data
const userData = {
  name: "Abhishek",
  email: "balajeet22@gmail.com",
  mobileNumber: "1212121212",
  location: { type: "Point", coordinates: [80.2817, 26.5001] }, // Example coordinates (Latitude, Longitude)
  addresses: [
    {
      street: "123 Main St",
      city: "Lucknow",
      state: "Uttar Pradesh",
      country: "India",
      postalCode: "226001",
      isDefault: true,
    },
    {
      street: "456 Market Road",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      postalCode: "110001",
      isDefault: false,
    },
  ],
};

// Usage
export default function Profile() {
    const { customer } = useSelector((state) => state?.customer);
    console.log(customer)
  return <UserProfile user={customer} />;
}
