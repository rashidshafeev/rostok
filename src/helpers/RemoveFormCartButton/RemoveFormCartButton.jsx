// src/components/RemoveFromCartButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlice';
import { useSendCartMutation } from '../../redux/api/cartEndpoints';
import { getTokenFromCookies } from '../cookies/cookies';
import { useModal } from '../../context/ModalContext';


const RemoveFromCartButton = ({ product, withConfirmation = false, children }) => {

  const { showModal } = useModal();
  const token = getTokenFromCookies();
  const dispatch = useDispatch();

  const [sendCart, {isLoading}] = useSendCartMutation();

  const handleRemoveFromCartClick = (e) => {
    e.preventDefault();

    if (withConfirmation) {
      showModal({type: 'confirmation', 'title': 'Удаление', 'text': 'Удалить товар из корзины?', action: remove, product: product});
      return
    } 


    if (token) {
      sendCart({ id: product.id, quantity: 0, selected: 0 })
    } 
    dispatch(removeFromCart(product));
  };

  const remove = (product) => {
    
    if (token) {
      sendCart({ id: product.id, quantity: 0, selected: 0 })
    } 
    dispatch(removeFromCart(product));
  }


  return children({ isLoading, handleRemoveFromCartClick });
};

export default RemoveFromCartButton;
