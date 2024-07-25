// src/components/FavoriteButton.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../../redux/slices/favoriteSlice';
import { useGetFavoritesQuery, useRemoveFromFavoritesMutation, useSendFavoritesMutation } from '../../redux/api/favoritesEndpoints';
import { getTokenFromCookies } from '../cookies/cookies';

const FavoriteButton = ({ product, children }) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const { favorite } = useSelector((state) => state.favorite);
  
  // Fetching favorites from the server if the user is logged in
  const { data: serverFavorites } = useGetFavoritesQuery(undefined, { skip: !token });

  const [sendFavoritesMutation, { isLoading: sendIsLoading }] = useSendFavoritesMutation();
  const [removeFromFavoritesMutation, { isLoading: removeIsLoading }] = useRemoveFromFavoritesMutation();
  const isLoading = sendIsLoading || removeIsLoading;

  const isInFavorite = token
    ? serverFavorites?.data?.some((el) => el.id === product.id)
    : favorite.some((el) => el.id === product.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInFavorite) {
      token ? removeFromFavoritesMutation(product) : dispatch(removeFromFavorite(product));
    } else {
      token ? sendFavoritesMutation(product) : dispatch(addToFavorite(product));
    }
  };

  return children({ isLoading, isInFavorite, handleFavoriteClick });
};

export default FavoriteButton;