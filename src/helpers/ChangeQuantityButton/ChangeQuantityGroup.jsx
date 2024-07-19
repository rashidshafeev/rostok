// src/components/ChangeQuantityGroup.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';

const ChangeQuantityGroup = ({ product, enableRemove = false }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(Number(product.quantity) || 1);
  const isFirstRender = useRef(true);
  const debounceTimer = useRef(null);

  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (!isFirstRender.current) {
        dispatch(changeQuantity({ id: product.id, quantity: newQuantity, selected: product.selected }));
      }
    }, 500);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const increaseQuantity = (e) => {
    e.preventDefault();
    updateQuantity(quantity + 1);
  };

  const decreaseQuantity = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    } else if (enableRemove && quantity === 1) {
      dispatch(removeFromCart(product));
    }
  };

  return (
    <div className="flex justify-between items-center grow">
      <button
        className='w-10 h-10 bg-colLightGray rounded-full flex items-center justify-center'
        onClick={decreaseQuantity}
        disabled={!enableRemove && quantity === 1}
      >
        <RemoveOutlined className={`${!enableRemove && quantity === 1 ? 'text-colGray' : 'text-colGreen'}`} />
      </button>
      <span className='text-colGreen font-semibold px-5'>{quantity}</span>
      <button
        className='w-10 h-10 bg-colLightGray rounded-full flex items-center justify-center'
        onClick={increaseQuantity}
      >
        <AddOutlined className='text-colGreen' />
      </button>
    </div >
  );
};

export default ChangeQuantityGroup;
