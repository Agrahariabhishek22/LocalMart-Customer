import { categories } from "../../data/categories";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../redux/shopsSlice";

const Sidebar = ({setSideBar}) => {
  const dispatch = useDispatch();
 // console.log(selectedCategory)
  const selectedCategory = useSelector((state) => state.shops.selectedCategory);

  return (
    <div className="z-50 text-black  dark:text-white">
      <h2 className="text-lg font-semibold text-center font-heading mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer p-2  font-sub-heading rounded ${
              selectedCategory === category
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => (dispatch(setSelectedCategory(category),setSideBar(false)))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
