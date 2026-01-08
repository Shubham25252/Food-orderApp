const SWIGGY_API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.11610&lng=79.07060&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(
  SWIGGY_API_URL
)}`;

const CACHE_KEY = "restaurantsCache";

async function getRestaurants() {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      console.log("Using cached data");
      return JSON.parse(cachedData);
    }

    const response = await fetch(PROXY_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const proxyData = await response.json();

    // ✅ IMPORTANT FIX
    const json = JSON.parse(proxyData.contents);

    console.log("Actual Swiggy JSON:", json);

    const resData = extractRestaurantData(json);

    if (resData.length > 0) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(resData));
    }

    return resData;
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return [];
  }
}

function extractRestaurantData(jsonData) {
  for (let i = 0; i < jsonData?.data?.cards?.length; i++) {
    const restaurants =
      jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    if (restaurants) {
      return restaurants;
    }
  }
  return [];
}

export default getRestaurants;
