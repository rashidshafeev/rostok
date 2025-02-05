import { useSelector } from 'react-redux';

import type { RootState } from '@/app/providers/store';

export const useQuantities = () => {
  const favorite = useSelector((state: RootState) => state.favorite.favorite);
  const comparison = useSelector(
    (state: RootState) => state.comparison.comparison
  );
  const cart = useSelector((state: RootState) => state.cart);

  const getFavoritesCount = () => {
    return favorite?.length || 0;
  };

  const getComparisonCount = () => {
    return comparison?.length || 0;
  };

  const getCartQuantity = () => {
    return cart.total?.quantity || 0;
  };

  return {
    getFavoritesCount,
    getComparisonCount,
    getCartQuantity,
  };
};
