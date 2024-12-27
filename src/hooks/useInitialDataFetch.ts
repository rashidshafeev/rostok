import { useEffect } from 'react';

import { setCart } from '@/features/cart/model/cartSlice';
import { useDispatch } from 'react-redux';

import { useGetRecentItemsQuery } from '@/features/auth';
import { useGetComparisonQuery } from '@/redux/api/comparisonEndpoints';
import { useGetFavoritesQuery } from '@/redux/api/favoritesEndpoints';
import { useGetUserCartQuery } from '@/features/cart/api/cartApi';
import { getTokenFromCookies } from '@/shared/lib';
import { setComparison } from '@/redux/slices/comparisonSlice';
import { setFavorite } from '@/redux/slices/favoriteSlice';
import { setRecentItems } from '@/redux/slices/recentItemsSlice';

import type { AppDispatch } from '@/app/providers/store';

const useInitialDataFetch = () => {
  const dispatch: AppDispatch = useDispatch();
  const token = getTokenFromCookies();

  const { data: serverComparison, isSuccess: isSuccessComparison } =
    useGetComparisonQuery(undefined, { skip: !token });

  const { data: serverFavorite, isSuccess: isSuccessFavorite } =
    useGetFavoritesQuery(undefined, { skip: !token });

  const { data: serverCart, isSuccess: isSuccessCart } = useGetUserCartQuery(
    undefined,
    { skip: !token }
  );

  const { data: serverRecentItems, isSuccess: isSuccessRecentItems } =
    useGetRecentItemsQuery(undefined, { skip: !token });

  const isSuccess =
    isSuccessComparison &&
    isSuccessFavorite &&
    isSuccessCart &&
    isSuccessRecentItems;

  useEffect(() => {
    if (!token) {
      const comparison = JSON.parse(sessionStorage.getItem('comparison'));
      dispatch(setComparison(comparison ? comparison : []));

      const favorite = JSON.parse(sessionStorage.getItem('favorite'));
      dispatch(setFavorite(favorite ? favorite : []));

      const recentItems = JSON.parse(sessionStorage.getItem('recentItems'));
      dispatch(setRecentItems(recentItems ? recentItems : []));

      const cart = JSON.parse(sessionStorage.getItem('cart'));
      dispatch(setCart(cart ? cart : null));
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

                total: cart.total,
                selected: cart.selected,
                currency: cart.current_currency,
              }
            : {
                cart: [],
                total: {
                  count: 0,
                  amount: 0,
                  quantity: 0,
                  discount: 0,
                },
                selected: {
                  count: 0,
                  amount: 0,
                  quantity: 0,
                  discount: 0,
                },
                currency: {
                  code: 'RUB',
                  title: 'Рубль',
                  symbol: '₽',
                },
              }
        )
      );
    }
  }, [dispatch, token, isSuccess]);
};

export default useInitialDataFetch;
