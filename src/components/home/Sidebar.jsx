import { categories } from "../../data/categories";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../redux/shopsSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.shops.selectedCategory);

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer p-2 rounded ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => dispatch(setSelectedCategory(category))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
