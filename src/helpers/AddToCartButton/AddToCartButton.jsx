// src/components/AddToCartButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { getTokenFromCookies } from '../cookies/cookies';
import { useGetUserCartQuery } from '../../redux/api/cartEndpoints';

const AddToCartButton = ({ product, children }) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const { cart } = useSelector((state) => state.cart);

  // Fetching cart from the server if the user is logged in
  const { data: serverCart } = useGetUserCartQuery(undefined, { skip: !token });

  const isInCart = token
    ? serverCart?.data?.some((el) => el.id === product.id)
    : cart.some((el) => el.id === product.id);

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    if (!isInCart) {
      dispatch(addToCart(product));
    }
  };

  return children({ isInCart, handleAddToCartClick });
};

export default AddToCartButton;