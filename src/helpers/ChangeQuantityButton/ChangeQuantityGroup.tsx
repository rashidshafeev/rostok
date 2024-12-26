// src/components/ChangeQuantityGroup.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeFromCart } from '@store/slices/cartSlice';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { getTokenFromCookies } from '@/features/auth/lib';;
import { useGetCartItemPriceMutation, useSendCartMutation } from '@/redux/api/cartEndpoints';
import { CartProduct } from '@/types/Store/Cart/CartState';
import { AppDispatch } from '@store/store';

type ChangeQuantityGroupProps = {
  product: CartProduct;
  enableRemove?: boolean;
}

const ChangeQuantityGroup = ({ product, enableRemove = false } : ChangeQuantityGroupProps) => {
  const token = getTokenFromCookies();
  
  const [quantity, setQuantity] = useState<number>(product.quantity || 1);
  const isFirstRender = useRef<boolean>(true);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const dispatch : AppDispatch = useDispatch();

  const [sendCart, { isLoading }] = useSendCartMutation();
  const [getItemPrice, { isLoading: isLoadingItemPrice, isSuccess: isSuccessItemPrice }] = useGetCartItemPriceMutation();

  const updateQuantity = async (newQuantity: number) => {
    setQuantity(newQuantity);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        if (!isFirstRender.current) {
          if (token) {
            await sendCart({ id: product.id, quantity: newQuantity, selected: product.selected });
          }
          
          const priceResponse = await getItemPrice({ item_id: product.id, quantity: newQuantity });
          
          dispatch(
            changeQuantity({
              id: product.id,
              quantity: newQuantity,
              price: ('data' in priceResponse && priceResponse.data?.data?.price) 
                ? priceResponse.data.data.price 
                : product.price
            })
          );
        }
      } catch (error) {
        console.error("An error occurred in updateQuantity:", error);
        setQuantity(product.quantity);
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
      clearTimeout(debounceTimer.current);
      if (token) {
        sendCart({ id: product.id, quantity: 0, selected: product.selected })
      }
      dispatch(removeFromCart(product));
    }
  };

  useEffect(() => {
    setQuantity(Number(product.quantity));
  }, [product.quantity]);

  return (
    <div className="flex justify-between items-center grow">
      <button
        className={`${ isLoading ? 'cursor-wait' : 'cursor-pointer'} w-10 h-10 bg-colLightGray rounded-full flex items-center justify-center`}
        onClick={decreaseQuantity}
        disabled={!enableRemove && quantity === 1}
      >
        <RemoveOutlined className={`${!enableRemove && quantity === 1 ? 'text-colGray' : 'text-colGreen'}`} />
      </button>
      <span className='text-colGreen font-semibold px-5'>{quantity}</span>
      <button
        className={` ${ isLoading ? 'cursor-wait' : 'cursor-pointer'} w-10 h-10 bg-colLightGray rounded-full flex items-center justify-center`}
        onClick={increaseQuantity}
      >
        <AddOutlined className='text-colGreen' />
      </button>
    </div >
  );
};

export default ChangeQuantityGroup;
