import { useDispatch, useSelector } from 'react-redux';

import {
  useRemoveFromFavoritesMutation,
  useSendFavoritesMutation,
} from '@/features/favorite';
import { getTokenFromCookies } from '@/shared/lib';

import { addToFavorite, removeFromFavorite } from '../';

import type { Product } from '@/entities/product';

export const useFavorites = (product: Product) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const favorite = useSelector((state) => state.favorite.favorite);

  const [sendFavorites, { isLoading: sendLoading }] =
    useSendFavoritesMutation();
  const [removeFavorites, { isLoading: removeLoading }] =
    useRemoveFromFavoritesMutation();

  const isInFavorite = favorite.some((el) => el.id === product?.id);
  const isLoading = sendLoading || removeLoading;

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isInFavorite) {
        if (token) {
          await removeFavorites(product);
        }
        dispatch(removeFromFavorite(product));
      } else {
        if (token) {
          await sendFavorites(product);
        }
        dispatch(addToFavorite(product));
      }
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  return {
    isInFavorite,
    isLoading,
    handleFavoriteClick,
  };
};
