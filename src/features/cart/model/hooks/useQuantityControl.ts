import { useState, useRef, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useGetCartItemPriceMutation } from '@/entities/price';
import { useSendCartMutation } from '@/features/cart';
import { getTokenFromCookies } from '@/shared/lib';

import { changeQuantity, removeFromCart } from '../';

import type { CartProduct } from '../types';

interface UseQuantityControlProps {
  product: CartProduct;
  enableRemove?: boolean;
}

export const useQuantityControl = ({
  product,
  enableRemove = false,
}: UseQuantityControlProps) => {
  const token = getTokenFromCookies();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const isFirstRender = useRef(true);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const [sendCart, { isLoading }] = useSendCartMutation();
  const [getItemPrice] = useGetCartItemPriceMutation();

  useEffect(() => {
    setQuantity(Number(product.quantity));
  }, [product.quantity]);

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

  const updateQuantity = async (newQuantity: number) => {
    setQuantity(newQuantity);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        if (!isFirstRender.current) {
          if (token) {
            await sendCart({
              id: product.id,
              quantity: newQuantity,
              selected: product.selected,
            });
          }

          const priceResponse = await getItemPrice({
            item_id: product.id,
            quantity: newQuantity,
          });

          dispatch(
            changeQuantity({
              id: product.id,
              quantity: newQuantity,
              price: priceResponse.data?.data?.price || product.price,
            })
          );
        }
      } catch (error) {
        console.error('Failed to update quantity:', error);
        setQuantity(product.quantity);
      }
    }, 500);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    updateQuantity(quantity + 1);
  };

  const handleDecrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    } else if (enableRemove && quantity === 1) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (token) {
        await sendCart({
          id: product.id,
          quantity: 0,
          selected: product.selected,
        });
      }
      dispatch(removeFromCart(product));
    }
  };

  return {
    quantity,
    isLoading,
    handleIncrease,
    handleDecrease,
    isMinQuantity: !enableRemove && quantity === 1,
  };
};
