import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getTokenFromCookies } from '@/shared/lib';
import { addToRecentItems } from '@store/slices/recentItemsSlice';

import type { Product } from '@/entities/product/Product';
import type { AppDispatch } from '@store/store';

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
