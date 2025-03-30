import { ShoppingCart, Store, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        About <span className="text-blue-500">Shopsy</span>
      </h1>
      
      {/* Description */}
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-3xl mb-8">
        Shopsy aims to bridge the gap between local markets and online shoppers, offering a platform where
        customers can explore shops, browse products, and enjoy a shopping experience just like an offline market.
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <Store size={40} className="text-blue-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">Local Shops Online</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Bringing your favorite local stores online for easy access and convenience.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <ShoppingCart size={40} className="text-purple-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">Seamless Shopping</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Explore, compare, and order products directly from your local market.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <Globe size={40} className="text-green-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">Wider Reach</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Empowering small businesses by providing them an online presence.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mt-10 max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          We believe in supporting local businesses by giving them the tools to thrive in the digital age.
          Shopsy is designed to enhance accessibility, affordability, and community-driven commerce for both
          sellers and buyers.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;