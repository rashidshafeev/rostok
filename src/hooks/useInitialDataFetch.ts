import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setComparison } from "@store/slices/comparisonSlice";
import { setFavorite } from "@store/slices/favoriteSlice";
import { setCart } from "@store/slices/cartSlice";
import { setRecentItems } from "@store/slices/recentItemsSlice";
import { getTokenFromCookies } from "@helpers/cookies/cookies";
import { useGetUserCartQuery } from "@api/cartEndpoints";
import { useGetComparisonQuery } from "@api/comparisonEndpoints";
import { useGetFavoritesQuery } from "@api/favoritesEndpoints";
import { useGetRecentItemsQuery } from "@api/userEndpoints";
import { AppDispatch } from "@store/store";

const useInitialDataFetch = () => {
  const dispatch : AppDispatch = useDispatch();
  const token = getTokenFromCookies();

  const {
    data: serverComparison,
    isSuccess: isSuccessComparison,
  } = useGetComparisonQuery(undefined, { skip: !token });

  const {
    data: serverFavorite,
    isSuccess: isSuccessFavorite,
  } = useGetFavoritesQuery(undefined, { skip: !token });

  const {
    data: serverCart,
    isSuccess: isSuccessCart,
  } = useGetUserCartQuery(undefined, { skip: !token });

  const {
    data: serverRecentItems,
    isSuccess: isSuccessRecentItems,
  } = useGetRecentItemsQuery(undefined, { skip: !token });

  const isSuccess =
    isSuccessComparison &&
    isSuccessFavorite &&
    isSuccessCart &&
    isSuccessRecentItems;

  useEffect(() => {
    if (!token) {
      const comparison = JSON.parse(sessionStorage.getItem("comparison"));
      dispatch(setComparison(comparison ? comparison : []));

      const favorite = JSON.parse(sessionStorage.getItem("favorite"));
      dispatch(setFavorite(favorite ? favorite : []));

      const recentItems = JSON.parse(sessionStorage.getItem("recentItems"));
      dispatch(setRecentItems(recentItems ? recentItems : []));

      const cart = JSON.parse(sessionStorage.getItem("cart"));
      dispatch(
        setCart(
          cart
            ? cart
            : null
        )
      );
    } else if (token && isSuccess) {
      const comparison = serverComparison?.data;
      dispatch(setComparison(comparison ? comparison : []));

      const favorite = serverFavorite?.data;
      dispatch(setFavorite(favorite ? favorite : []));

      const recentItems = serverRecentItems?.data;
      dispatch(setRecentItems(recentItems ? recentItems : []));

      const cart = serverCart;
      dispatch(
        setCart(
          cart
            ? {
                cart: cart.data,
                itemsSum: cart.total_amount,
                currency: cart.current_currency,
              }
            : {
                cart: [],
                itemsQuantity: 0,
                itemsSum: 0,
              }
        )
      );
    }
  }, [dispatch, token, isSuccess]);
};

export default useInitialDataFetch;