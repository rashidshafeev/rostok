// src/components/AddToCartButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { getTokenFromCookies } from '../cookies/cookies';
import { useGetUserCartQuery, useSendCartMutation } from '../../redux/api/cartEndpoints';

const AddToCartButton = ({ product, children }) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const { cart } = useSelector((state) => state.cart);

  // Fetching cart from the server if the user is logged in
  const { data: serverCart } = useGetUserCartQuery(undefined, { skip: !token });
  const [sendCart, { isLoading, isSuccess }] = useSendCartMutation();

  const handleAddToCartClick = (e) => {
    e.preventDefault();

    token ? sendCart({ id: product.id, quantity: 1, selected: 0 }) : dispatch(addToCart(product))
  
  };

  return children({ handleAddToCartClick, isLoading, isSuccess });
};

export default AddToCartButton;