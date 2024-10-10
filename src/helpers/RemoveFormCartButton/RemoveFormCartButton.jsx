// src/components/RemoveFromCartButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlice';
import { useSendCartMutation } from '../../redux/api/cartEndpoints';
import { getTokenFromCookies } from '../cookies/cookies';

const RemoveFromCartButton = ({ product, children }) => {
  const token = getTokenFromCookies();
  const dispatch = useDispatch();

  const [sendCart, {isLoading}] = useSendCartMutation();

  const handleRemoveFromCartClick = (e) => {
    e.preventDefault();
    // dispatch(removeFromCart(product));
    if (token) {
      sendCart({ id: product.id, quantity: 0, selected: 0 })
    } 
    dispatch(removeFromCart(product));
  };

  return children({ isLoading, handleRemoveFromCartClick });
};

export default RemoveFromCartButton;
