// src/components/ChangeQuantityGroup.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../../redux/slices/cartSlice';
import { useDebounce } from 'react-use';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';

const ChangeQuantityGroup = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(Number(product.quantity) || 1);
  const [debouncedQuantity, setDebouncedQuantity] = useState(quantity);

  const [, cancel] = useDebounce(
    () => {
        console.log('debouncedQuantity', debouncedQuantity);
      dispatch(changeQuantity({ id: product.id, quantity: debouncedQuantity }));
    },
    500, // debounce delay in milliseconds
    [debouncedQuantity]
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  const increaseQuantity = (e) => {
    e.preventDefault()
    setQuantity((prevQuantity) => prevQuantity + 1);
    setDebouncedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = (e) => {
    e.preventDefault()
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
    setDebouncedQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  return (
    <div className="flex justify-between items-center grow">
      <button
                className='w-10 h-10 bg-colSuperLight rounded-full flex items-center justify-center'
                onClick={decreaseQuantity}
              >
                <RemoveOutlined className='text-colGreen' />
              </button>
              <span className='text-colGreen font-semibold px-5'>{quantity}</span>
              <button
                className='w-10 h-10 bg-colSuperLight rounded-full flex items-center justify-center'
                onClick={increaseQuantity}
              >
                <AddOutlined className='text-colGreen' />
              </button>
    </div>
  );
};

export default ChangeQuantityGroup;
