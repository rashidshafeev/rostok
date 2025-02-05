// src/app/providers/InitializationProvider/lib/useInitialDataSync.ts
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '@/entities/user/lib/hooks/useAuth';
import { useGetUserCartQuery, setCart } from '@/features/cart';
import { useGetComparisonQuery, setComparison } from '@/features/comparison';
import { useGetFavoritesQuery, setFavorite } from '@/features/favorite';
import {
  useGetRecentItemsQuery,
  setRecentItems,
} from '@/features/recent-items';

import { syncLocalStorageWithState } from './utils';

import type { AppDispatch, RootState } from '@/app/providers/store';

export const useInitialDataSync = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const isInitialized = useSelector((state: RootState) => state.user.isInitialized);
  const [isSynced, setIsSynced] = useState(false);

  // Skip queries until auth is initialized
  const skipQueries = !isInitialized;

  const { data: serverComparison, isSuccess: isSuccessComparison } =
    useGetComparisonQuery(undefined, { skip: skipQueries });

  const { data: serverFavorite, isSuccess: isSuccessFavorite } =
    useGetFavoritesQuery(undefined, { skip: skipQueries });

  const { data: serverCart, isSuccess: isSuccessCart } = useGetUserCartQuery(
    undefined,
    { skip: skipQueries }
  );

  const { data: serverRecentItems, isSuccess: isSuccessRecentItems } =
    useGetRecentItemsQuery(undefined, { skip: skipQueries });

  useEffect(() => {
    const syncData = async () => {
      if (!isInitialized) return;

      if (!isAuthenticated) {
        syncLocalStorageWithState(dispatch);
        setIsSynced(true);
        return;
      }

      if (
        isSuccessComparison &&
        isSuccessFavorite &&
        isSuccessCart &&
        isSuccessRecentItems
      ) {
        // Update state with server data
        dispatch(setComparison(serverComparison?.data ?? []));
        dispatch(setFavorite(serverFavorite?.data ?? []));
        dispatch(setRecentItems(serverRecentItems?.data ?? []));
        dispatch(
          setCart(
            serverCart
              ? {
                  cart: serverCart.data,
                  total: serverCart.total,
                  selected: serverCart.selected,
                  currency: serverCart.current_currency,
                }
              : null
          )
        );
        setIsSynced(true);
      }
    };

    syncData();
  }, [
    dispatch,
    isInitialized,
    isAuthenticated,
    isSuccessComparison,
    isSuccessFavorite,
    isSuccessCart,
    isSuccessRecentItems,
    serverComparison,
    serverFavorite,
    serverCart,
    serverRecentItems,
  ]);

  return { isSynced };
};
