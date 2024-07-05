// src/components/RemoveFromCartButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlice';
import { useGetCartQuery } from '../../redux/api/cartEndpoints';
import { getTokenFromCookies } from '../cookies/cookies';

const RemoveFromCartButton = ({ product, children }) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const { cart } = useSelector((state) => state.cart);

  // Fetching cart from the server if the user is logged in
  const { data: serverCart } = useGetCartQuery(undefined, { skip: !token });

  const isInCart = token
    ? serverCart?.data?.some((el) => el.id === product.id)
    : cart.some((el) => el.id === product.id);

  const handleRemoveFromCartClick = (e) => {
    e.preventDefault();
    if (isInCart) {
      dispatch(removeFromCart(product));
    }
  };

  return children({ isInCart, handleRemoveFromCartClick });
};

export default RemoveFromCartButton;