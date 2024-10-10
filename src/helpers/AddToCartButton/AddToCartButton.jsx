// src/components/AddToCartButton.js
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { getFromSessionStorage, getTokenFromCookies, saveToSessionStorage } from '../cookies/cookies';
import { useGetCartItemPriceMutation, useGetUserCartQuery, useSendCartMutation } from '../../redux/api/cartEndpoints';
import { toast } from 'sonner';

const AddToCartButton = ({ product, children }) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();

  // Fetching cart from the server if the user is logged in
  const [sendCart, { isLoading, isSuccess, status }] = useSendCartMutation();
 const [getItemPrice, { isLoading: isLoadingItemPrice, isSuccess: isSuccessItemPrice }] = useGetCartItemPriceMutation();
  // const handleAddToCartClicаk = (e) => {
  //   e.preventDefault();
    
  //   // toast('This is a sonner toast')
   
  //   token ? sendCart({ id: product.id, quantity: 1, selected: 0 }) : dispatch(addToCart(product))
    
  // }
  const handleAddToCartClick = async (e) =>  {
    e.preventDefault();
    
    // toast('This is a sonner toast')
   if  (token) {
     const addedProduct = sendCart({ id: product.id, quantity: 1, selected: 0 })
   }
    // token ? const addedProduct = sendCart({ id: product.id, quantity: 1, selected: 0 })
    const price = await getItemPrice({ item_id: product.id })
    // console.log(addedProduct, price)df
    const newProduct = { ...product, server_price: price?.data?.data }
    dispatch(addToCart(newProduct))
    
  }  



  // useLayoutEffect(() => {
  //   if (!isLoading) {
  //     window.scroll({
  //       top: window.scrollY + 138,
  //   behavior:'instant',
  //     });
  //   }
      
  // }, [isLoading]);

  return children({ handleAddToCartClick, isLoading, isSuccess });
};

export default AddToCartButton;