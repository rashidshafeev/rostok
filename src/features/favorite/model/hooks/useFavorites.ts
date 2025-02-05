import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import {
  useRemoveFromFavoritesMutation,
  useSendFavoritesMutation,
} from '@/features/favorite';
import { getTokenFromCookies } from '@/entities/user';

import { addToFavorite, removeFromFavorite } from '../';

import type { Product } from '@/entities/product';

export const useFavorites = (product: Product) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const favorite = useSelector((state) => state.favorite.favorite);
  const [isUpdating, setIsUpdating] = useState(false);

  const [sendFavorites, { isLoading: sendLoading }] =
    useSendFavoritesMutation();
  const [removeFavorites, { isLoading: removeLoading }] =
    useRemoveFromFavoritesMutation();

  const isInFavorite = favorite.some((el) => el.id === product?.id);
  const isLoading = isUpdating || sendLoading || removeLoading;

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsUpdating(true);
    try {
      if (isInFavorite) {
        // Optimistically remove from local state
        dispatch(removeFromFavorite(product));
        
        if (token) {
          const result = await removeFavorites(product);
          if ('error' in result) {
            // Revert on error
            dispatch(addToFavorite(product));
            toast.error('Failed to remove from favorites');
          }
        }
      } else {
        // Optimistically add to local state
        dispatch(addToFavorite(product));
        
        if (token) {
          const result = await sendFavorites(product);
          if ('error' in result) {
            // Revert on error
            dispatch(removeFromFavorite(product));
            toast.error('Failed to add to favorites');
          }
        }
      }
    } catch (error) {
      // Revert on error
      if (isInFavorite) {
        dispatch(addToFavorite(product));
      } else {
        dispatch(removeFromFavorite(product));
      }
      toast.error('Failed to update favorites');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isInFavorite,
    isLoading,
    handleFavoriteClick,
  };
};