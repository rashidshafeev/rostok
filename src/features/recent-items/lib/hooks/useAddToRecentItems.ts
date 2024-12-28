import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { addToRecentItems } from '@/features/recent-items/';
import { getTokenFromCookies } from '@/shared/lib';

import type { AppDispatch } from '@/app/providers/store';
import type { Product } from '@/entities/product';

export const useAddToRecentItems = (product: Product | null) => {
  const dispatch: AppDispatch = useDispatch();
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token && product?.id) {
      dispatch(addToRecentItems(product));
    }
  }, [product?.id, dispatch, token]); // Only re-run when product ID, dispatch, or token changes
};
