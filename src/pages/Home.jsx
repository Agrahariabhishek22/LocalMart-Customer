
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setSelectedCategory } from "../redux/shopsSlice";
import { useDispatch } from "react-redux";
import heroImage from "../assets/img6.jpg";
import categoriesImage from "../assets/img5.avif";
import reviewsImage from "../assets/img2.jpeg";
import faqImage from "../assets/img1.webp";

export default function Home() {
  const [faqOpen, setFaqOpen] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const faqs = [
    { question: "How does Shopsy work?", answer: "Shopsy allows you to explore local shops, order online, and get products delivered." },
    { question: "Is there a delivery charge?", answer: "Delivery charges vary depending on the shop and location." },
    { question: "How can I track my order?", answer: "You can track your order through the 'My Orders' section in your account." }
  ];

  const { callApi,loading,error } = useAPI();
  const {  selectedCategory } = useSelector((state) => state.shops);
const [sidebarOpen,setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const fetchShops = async () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // console.log(position.coords)
          const response = await callApi({ 
            url: `api/owner/getAllShops?latitude=${latitude}&longitude=${longitude}`, 
            method: "GET" 
          });
  
          // console.log(response);
          
          if (response) {
            dispatch(fetchShopsSuccess(response?.data));
            dispatch(setSelectedCategory(response?.data[0]?.shopCategory));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    };
  
    fetchShops();
  }, []);
  
if(loading){
  return <CardSkeleton/>
}

  return (
    <div className="min-h-screen text-white dark:bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 flex flex-col justify-around md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-xl sml:text-3xl md:text-5xl font-heading font-extrabold leading-tight drop-shadow-lg text-cyan-700 dark:text-cyan-300">Shop Locally, Order Instantly</h1>
          <p className="text-lg font-sub-heading mt-2 text-emerald-600 dark:text-emerald-300 opacity-90">Discover nearby shops and get what you need instantly.</p>
          <button onClick={() => navigate("/shops")} className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition">
            Explore Shops
          </button>
        </div>
        <img src={heroImage} alt="Shopping" className="w-[300px] h-[300px] rounded-lg shadow-lg mb-6 m-4  md:m-0" />
      </section>

      {/* Categories Section */}
      <section className="py-12 px-6   ">
        <div className=" text-center ">
          <h2 className="text-3xl font-semibold font-heading mb-6 text-cyan-700 dark:text-cyan-300">Categories</h2>
         <div className="flex flex-col justify-around md:flex-row items-center">
         <img src={categoriesImage} alt="Categories" className="w-[300px] h-full rounded-lg shadow-lg mb-6 md:mb-0" />

         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {["Clothing", "Electronics", "Grocery", "Furniture", "Pharmacy", "More"].map((category, index) => (
              <div
                onClick={() => { (category !== "More") && dispatch(setSelectedCategory(category)), navigate("/shops"); }}
                key={index}
                className="p-2 flex justify-center items-center flex-col bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center cursor-pointer hover:shadow-lg transition-all"
              >
                <p className="text-lg font-sub-heading font-semibold mt-2">{category}</p>
                <FaArrowCircleRight className="h-5 w-5"/>
              </div>
            ))}
          </div>
        
         </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-12 px-6 ">
        <div className=" text-center ">
          <h2 className="text-3xl font-heading font-semibold mb-6 text-cyan-700 dark:text-cyan-300">Customer Reviews</h2>
          <div className="grid grid-cols-2 gap-6">
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
        </div>
       
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-6 ">
       
        <div className=" text-center ">
          <h2 className="text-3xl font-heading font-semibold mb-6 text-cyan-700 dark:text-cyan-300">FAQs</h2>
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
        </div>
      </section>
       {/* Contact Us Section */}
       <section className="py-12 px-6">
        <h2 className="text-3xl font-heading font-semibold text-center mb-6 text-cyan-700 dark:text-cyan-300">Contact Us</h2>
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