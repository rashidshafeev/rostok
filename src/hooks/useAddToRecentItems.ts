import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToRecentItems } from "@store/slices/recentItemsSlice";
import { Product } from "@/types/Product/Product";
import { getTokenFromCookies } from '@/features/auth/lib';;
import { AppDispatch } from "@store/store";

const useAddToRecentItems = (product: Product | null) => {
  const dispatch: AppDispatch = useDispatch();
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token && product?.id) {
      dispatch(addToRecentItems(product));
    }
  }, [product?.id, dispatch, token]); // Only re-run when product ID, dispatch, or token changes
};

export default useAddToRecentItems;