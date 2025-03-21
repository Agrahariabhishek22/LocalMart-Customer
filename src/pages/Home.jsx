import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setSelectedCategory } from "../redux/shopsSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const [faqOpen, setFaqOpen] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const faqs = [
    { question: "How does Shopsy work?", answer: "Shopsy allows you to explore local shops, order online, and get products delivered." },
    { question: "Is there a delivery charge?", answer: "Delivery charges vary depending on the shop and location." },
    { question: "How can I track my order?", answer: "You can track your order through the 'My Orders' section in your account." }
  ];

  return (
    <div className="min-h-screen text-white dark:bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-indigo-500 to-purple-700 text-white px-4">
        <h1 className="text-xl sml:text-3xl md:text-5xl font-extrabold leading-tight">Shop Locally, Order Instantly</h1>
        <p className="text-lg mt-2 opacity-80">Discover nearby shops and get what you need instantly.</p>
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-lg mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for shops..."
              className="w-full px-4 py-3 pl-12 text-gray-900 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 shadow-md focus:outline-none"
            />
            <span className="absolute left-4 top-3 text-gray-500">🔍</span>
          </div>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-5 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition">
            Change Location
          </button>
        </div>
        <button onClick={() => navigate("/shops")} className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition">
          Explore Shops
        </button>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Clothing", "Electronics", "Grocery", "Furniture", "Pharmacy", "More"].map((category, index) => (
            <div
              onClick={() => { (category !== "More") && dispatch(setSelectedCategory(category)), navigate("/shops"); }}
              key={index}
              className="p-6 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg text-center cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="text-3xl">{category === "Clothing" ? "👕" : category === "Electronics" ? "📱" : category === "Grocery" ? "🛒" : category === "Furniture" ? "🛋️" : category === "Pharmacy" ? "💊" : ""}</div>
              <p className="text-lg font-semibold mt-2">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-12 px-6 dark:bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Amazing service and quick delivery!", "Love the UI! Makes shopping easy!", "Fantastic concept, will use again!"].map((review, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg text-white shadow-lg ${index === 0 ? "bg-gradient-to-r from-green-400 to-blue-500" : index === 1 ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gradient-to-r from-red-400 to-pink-500"}`}
            >
              <p className="italic">"{review}"</p>
              <div className="mt-2 font-semibold text-right">- Happy Customer</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">FAQs</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 rounded-lg shadow-md cursor-pointer" onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <ChevronDown className={`transition-transform ${faqOpen === index ? "rotate-180" : "rotate-0"}`} />
              </div>
              {faqOpen === index && <p className="mt-2 text-gray-300">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
        <div className="max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg shadow-lg text-white text-center">
          <p className="text-lg font-semibold">Have any questions? Reach out to us!</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <FaEnvelope className="w-5 h-5" />
              <p>support@shopsy.com</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaPhone className="w-5 h-5" />
              <p>+123 456 7890</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}