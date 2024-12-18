import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToRecentItems } from "@store/slices/recentItemsSlice";
import { Product } from "@customTypes/Product/Product";
import { getTokenFromCookies } from "@helpers/cookies/cookies";
import { AppDispatch  } from "@store/store";

const useAddToRecentItems = (product: Product | null) => {
  const dispatch: AppDispatch = useDispatch();
  const token = getTokenFromCookies();
console.log("product in hook");
console.log(product);
  useEffect(() => {
    if (!token && product?.id) {
      dispatch(addToRecentItems(product));
    }
  }, [product]);
};

export default useAddToRecentItems;