import { useDispatch } from 'react-redux';
import { useSendCartMutation } from '@/features/cart/api/cartApi';
import { useSendComparisonMutation } from '@/features/comparison/api/comparisonApi';
import { useSendFavoritesMutation } from '@/features/favorite/api/favoritesEndpoints';
import { setCart } from '@/features/cart/model/cartSlice';
import { setComparison } from '@/features/comparison/model/comparisonSlice';
import { setFavorite } from '@/features/favorite/model/favoriteSlice';

export const useSyncUserData = () => {
  const dispatch = useDispatch();
  
  const [sendCart, { isLoading: isCartLoading }] = useSendCartMutation();
  const [sendFavorites, { isLoading: isFavoritesLoading }] = useSendFavoritesMutation();
  const [sendComparison, { isLoading: isComparisonLoading }] = useSendComparisonMutation();

  const isLoading = isCartLoading || isFavoritesLoading || isComparisonLoading;

  const syncUserData = async (cart, comparison, favorite) => {
    try {
      // Only send requests if there are items
      if (cart.length > 0) {
        await sendCart({
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            selected: item.selected ? 1 : 0,
          })),
        });
      }

      if (comparison.length > 0) {
        await sendComparison(comparison.map((item) => item.id));
      }

      if (favorite.length > 0) {
        await sendFavorites(favorite.map((item) => item.id));
      }

      // Clear local storage and state
      sessionStorage.removeItem('cart');
      sessionStorage.removeItem('comparison');
      sessionStorage.removeItem('favorite');
      
      dispatch(
        setCart({
          cart: [],
          selected: {
            amount: 0,
            count: 0,
            quantity: 0,
            discount: 0,
          },
          total: {
            amount: 0,
            count: 0,
            quantity: 0,
            discount: 0,
          },
          currency: {
            code: 'RUB',
            symbol: '₽',
            title: 'Рубль',
          },
        })
      );
      dispatch(setComparison([]));
      dispatch(setFavorite([]));
    } catch (error) {
      console.error('Error syncing user data:', error);
    }
  };

  return { syncUserData, isLoading };
};