import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ITEM_IMG_CDN_URL } from "../constants";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../store/Reducers";
import { IndianRupee } from "lucide-react";
import mockMenus from "../mock/mockMenus";

function RestaurantDetails() {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // ✅ Fetch menu based on restaurant ID (mock data)
  const getRestaurantInfo = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const menu = mockMenus[id];

      if (!menu) {
        toast.info("Menu coming soon for this restaurant", {
          position: "bottom-right",
          theme: "colored",
        });
        setMenuItems([]);
      } else {
        setMenuItems(menu);
      }

      setLoading(false);
    }, 300); // simulate API delay
  }, [id]);

  useEffect(() => {
    getRestaurantInfo();
  }, [getRestaurantInfo]);

  const handleAddToCart = (item) => {
    dispatch(ADD_TO_CART(item));
    toast.success("Item added to cart!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  // ✅ Memoized rendering for performance
  const renderedMenuItems = useMemo(() => {
    return menuItems.map((item) => (
      <div
        key={item.id}
        className="flex justify-between shadow-lg px-6 py-12 mb-10 w-[400px] sm:w-[550px] xl:w-[750px] rounded-xl md:w-[700px] dark:text-white dark:border"
      >
        <div>
          <h3 className="text-lg xl:text-2xl">
            {item.name.slice(0, 30)}
          </h3>

          <p className="flex mt-3 items-center">
            <IndianRupee />
            {(item.price || item.defaultPrice) / 100}
          </p>

          <span className="inline-block bg-yellow-400 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded mt-2">
            {item.ratings?.aggregatedRating?.rating} ★
          </span>

          <p className="text-gray-500 mt-3 w-[200px] sm:w-[300px] xl:w-[450px]">
            {item.description?.slice(0, 100)}
          </p>
        </div>

        <div className="relative">
          {item.imageId && (
            <img
              className="w-40 h-32 xl:w-48 xl:h-40 object-cover rounded-xl"
              src={`${ITEM_IMG_CDN_URL}${item.imageId}`}
              alt={item.name}
            />
          )}

          <button
            className="absolute right-4 bg-white text-green-600 font-bold shadow-xl px-6 py-3 rounded-lg top-32 w-32"
            onClick={() => handleAddToCart(item)}
          >
            ADD +
          </button>
        </div>
      </div>
    ));
  }, [menuItems]);

  return (
    <div className="pt-44 flex flex-col items-center relative min-h-screen dark:bg-[rgb(32,33,36)]">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-black dark:text-white text-xl xl:text-2xl absolute left-20 xl:left-96 top-32">
            Recommended ({menuItems.length})
          </h1>

          {menuItems.length === 0 ? (
            <p className="text-gray-400 mt-24 text-lg">
              Menu coming soon for this restaurant 🍽️
            </p>
          ) : (
            <div>{renderedMenuItems}</div>
          )}
        </>
      )}
    </div>
  );
}

export default RestaurantDetails;
