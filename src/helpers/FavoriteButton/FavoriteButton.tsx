// src/components/FavoriteButton.js
import type React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  useRemoveFromFavoritesMutation,
  useSendFavoritesMutation,
} from '@/redux/api/favoritesEndpoints';
import { getTokenFromCookies } from '@/shared/lib';
import { addToFavorite, removeFromFavorite } from '@store/slices/favoriteSlice';

import type { Product } from '@/entities/product/Product';
import type { AppDispatch, RootState } from '@store/store';

type FavoriteButtonProps = {
  product: Product;
  children: (renderProps: {
    isLoading: boolean;
    isInFavorite: boolean;
    handleFavoriteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }) => React.ReactNode;
};

const FavoriteButton = ({ product, children }: FavoriteButtonProps) => {
  const dispatch: AppDispatch = useDispatch();

  const token = getTokenFromCookies();
  const { favorite } = useSelector((state: RootState) => state.favorite);

  const [sendFavoritesMutation, { isLoading: sendIsLoading }] =
    useSendFavoritesMutation();
  const [removeFromFavoritesMutation, { isLoading: removeIsLoading }] =
    useRemoveFromFavoritesMutation();
  const isLoading = sendIsLoading || removeIsLoading;

  const isInFavorite = favorite.some((el) => el.id === product?.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInFavorite) {
      if (token) {
        removeFromFavoritesMutation(product);
      }
      dispatch(removeFromFavorite(product));
    } else {
      if (token) {
        sendFavoritesMutation(product);
      }
      dispatch(addToFavorite(product));
    }
  };

  return children({ isLoading, isInFavorite, handleFavoriteClick });
};

export default FavoriteButton;
