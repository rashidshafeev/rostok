import { useSelector } from 'react-redux';
import { useGetUserDataQuery } from '@/redux/api/userEndpoints';
import { RootState } from '@store/store';

export const useQuantities = (token: string | null) => {
  const favorite = useSelector((state: RootState) => state.favorite.favorite);
  const comparison = useSelector((state: RootState) => state.comparison.comparison);
  const cart = useSelector((state: RootState) => state.cart);

  const { data: user } = useGetUserDataQuery(undefined, { skip: !token });

  const getFavoritesCount = () => {
    return user ? user?.favorites?.items_count : (favorite?.length || 0);
  };

  const getComparisonCount = () => {
    return user ? user?.comparison?.items_count : (comparison?.length || 0);
  };

  const getCartQuantity = () => {
    return user ? user?.cart?.quantity : (cart.total?.quantity || 0);
  };

  return {
    getFavoritesCount,
    getComparisonCount,
    getCartQuantity
  };
}; 