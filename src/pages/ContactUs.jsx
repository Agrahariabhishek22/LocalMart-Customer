import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Have any questions? We'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={24} className="text-blue-500" />
              <p className="text-lg">support@shopsy.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={24} className="text-green-500" />
              <p className="text-lg">+91 9876543210</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={24} className="text-red-500" />
              <p className="text-lg">Local Market, Your City, India</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
              required
            ></textarea>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-bold text-lg hover:opacity-90 transition-all">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;