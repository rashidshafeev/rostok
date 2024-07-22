// src/components/RemoveFromCartButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlice';

const RemoveFromCartButton = ({ product, children }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCartClick = (e) => {
    e.preventDefault();
    dispatch(removeFromCart(product));

  };

  return children({  handleRemoveFromCartClick });
};

export default RemoveFromCartButton;
