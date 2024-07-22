// src/components/FavoriteButton.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../../redux/slices/favoriteSlice';
import { useGetFavoritesQuery } from '../../redux/api/favoritesEndpoints';
import { getTokenFromCookies } from '../cookies/cookies';

const FavoriteButton = ({ product, children }) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const { favorite } = useSelector((state) => state.favorite);
  
  // Fetching favorites from the server if the user is logged in
  const { data: serverFavorites } = useGetFavoritesQuery(undefined, { skip: !token });

  const isInFavorite = token
    ? serverFavorites?.data?.some((el) => el.id === product.id)
    : favorite.some((el) => el.id === product.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isInFavorite) {
      dispatch(removeFromFavorite(product));
    } else {
      dispatch(addToFavorite(product));
    }
  };

  return children({ isInFavorite, handleFavoriteClick });
};

export default FavoriteButton;