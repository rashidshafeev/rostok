import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getTokenFromCookies } from '@/entities/user';
import {
  useSendCartMutation,
  useGetUserCartQuery,
  transformServerCartToLocalCart,
  setCart,
} from '@/features/cart';
import {
  useSendComparisonMutation,
  useGetComparisonQuery,
  setComparison,
} from '@/features/comparison';
import {
  useSendFavoritesMutation,
  useGetFavoritesQuery,
  setFavorite,
} from '@/features/favorite';

const initialCartState = {
  cart: [],
  selected: {
    items_count: 0,
    quantity: 0,
    price_before_discount: 0,
    discount: 0,
    price_after_discount: 0,
  },
  total: {
    items_count: 0,
    quantity: 0,
    price_before_discount: 0,
    discount: 0,
    price_after_discount: 0,
  },
  currency: {
    code: 'RUB',
    title: 'Рубль',
    symbol: '₽',
  },
};

export const useSyncUserData = () => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();

  // Server data mutations
  const [sendCart, { isLoading: isCartSending }] = useSendCartMutation();
  const [sendFavorites, { isLoading: isFavoritesSending }] =
    useSendFavoritesMutation();
  const [sendComparison, { isLoading: isComparisonSending }] =
    useSendComparisonMutation();

  // Server data queries
  const {
    data: serverCart,
    isLoading: isCartLoading,
    refetch: refetchCart,
  } = useGetUserCartQuery(undefined, { skip: !token });

  const {
    data: serverFavorites,
    isLoading: isFavoritesLoading,
    refetch: refetchFavorites,
  } = useGetFavoritesQuery(undefined, { skip: !token });

  const {
    data: serverComparison,
    isLoading: isComparisonLoading,
    refetch: refetchComparison,
  } = useGetComparisonQuery(undefined, { skip: !token });

  // Update Redux state when server data changes
  useEffect(() => {
    if (token && serverCart) {
      const localCartState = transformServerCartToLocalCart(serverCart);
      dispatch(setCart(localCartState));
    }
  }, [serverCart, dispatch, token]);

  useEffect(() => {
    if (token && serverFavorites?.data) {
      dispatch(setFavorite(serverFavorites.data));
    }
  }, [serverFavorites, dispatch, token]);

  useEffect(() => {
    if (token && serverComparison?.data) {
      dispatch(setComparison(serverComparison.data));
    }
  }, [serverComparison, dispatch, token]);

  const isLoading =
    isCartSending ||
    isFavoritesSending ||
    isComparisonSending ||
    isCartLoading ||
    isFavoritesLoading ||
    isComparisonLoading;

  // Clear all local data
  const clearLocalData = () => {
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('comparison');
    sessionStorage.removeItem('favorite');

    dispatch(setCart(initialCartState));
    dispatch(setComparison([]));
    dispatch(setFavorite([]));
  };

  // Sync local data to server on login
  const syncOnLogin = async (cart, comparison, favorite) => {
    try {
      // Send local data to server
      if (cart?.length > 0) {
        await sendCart({
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            selected: item.selected ? 1 : 0,
          })),
        });
      }

      if (comparison?.length > 0) {
        await sendComparison(comparison.map((item) => item.id));
      }

      if (favorite?.length > 0) {
        await sendFavorites(favorite.map((item) => item.id));
      }

      // Clear local storage and state
      clearLocalData();

      // Fetch fresh data from server
      await Promise.all([
        refetchCart(),
        refetchComparison(),
        refetchFavorites(),
      ]);
    } catch (error) {
      console.error('Error syncing data on login:', error);
      throw error;
    }
  };

  // Clear data on logout
  const clearOnLogout = () => {
    clearLocalData();
  };

  return {
    syncOnLogin,
    clearOnLogout,
    isLoading,
    serverCart,
    serverFavorites,
    serverComparison,
  };
};
