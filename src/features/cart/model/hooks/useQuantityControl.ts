// src/features/cart/model/hooks/useQuantityControl.ts
import { useState, useRef, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { useGetCartItemPriceMutation } from '@/entities/price';
import { getTokenFromCookies } from '@/entities/user';

import { useSendCartMutation } from '../../api';
import { changeQuantity, removeFromCart } from '../cartSlice';

import type { CartProduct } from '../types';

interface UseQuantityControlProps {
  product: CartProduct;
  enableRemove?: boolean;
}

interface UseQuantityControlReturn {
  quantity: number;
  isLoading: boolean;
  handleIncrease: (e: React.MouseEvent) => Promise<void>;
  handleDecrease: (e: React.MouseEvent) => Promise<void>;
  isMinQuantity: boolean;
}

export const useQuantityControl = ({
  product,
  enableRemove = false,
}: UseQuantityControlProps): UseQuantityControlReturn => {
  const token = getTokenFromCookies();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const previousQuantity = useRef(product.quantity);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [sendCart, { isLoading: sendCartLoading }] = useSendCartMutation();
  const [getItemPrice, { isLoading: priceLoading }] =
    useGetCartItemPriceMutation();

  useEffect(() => {
    setQuantity(Number(product.quantity));
  }, [product.quantity]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const updateQuantity = async (newQuantity: number) => {
    if (isLoading) return;

    const oldQuantity = previousQuantity.current;
    setIsLoading(true);

    try {
      // Optimistically update local state
      setQuantity(newQuantity);
      dispatch(
        changeQuantity({
          id: product.id,
          quantity: newQuantity,
          price: product.price,
        })
      );

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        try {
          // Get updated price
          const priceResponse = await getItemPrice({
            item_id: product.id,
            quantity: newQuantity,
          });

          // If logged in, sync with server
          if (token) {
            const result = await sendCart({
              id: product.id,
              quantity: newQuantity,
              selected: product.selected,
            });

            if ('error' in result) {
              setQuantity(oldQuantity);
              dispatch(
                changeQuantity({
                  id: product.id,
                  quantity: oldQuantity,
                  price: product.price,
                })
              );
              toast.error('Failed to update quantity');
              return;
            }
          }

          // Update price if available
          if ('data' in priceResponse) {
            dispatch(
              changeQuantity({
                id: product.id,
                quantity: newQuantity,
                price: priceResponse.data.data.price,
              })
            );
          }

          previousQuantity.current = newQuantity;
        } catch (error) {
          setQuantity(oldQuantity);
          dispatch(
            changeQuantity({
              id: product.id,
              quantity: oldQuantity,
              price: product.price,
            })
          );
          toast.error('Failed to update quantity');
        }
      }, 500);
    } catch (error) {
      setQuantity(oldQuantity);
      dispatch(
        changeQuantity({
          id: product.id,
          quantity: oldQuantity,
          price: product.price,
        })
      );
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    await updateQuantity(quantity + 1);
  };

  const handleDecrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 1) {
      await updateQuantity(quantity - 1);
    } else if (enableRemove && quantity === 1) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      setIsLoading(true);
      try {
        if (token) {
          await sendCart({
            id: product.id,
            quantity: 0,
            selected: product.selected,
          });
        }
        dispatch(removeFromCart(product));
      } catch (error) {
        toast.error('Failed to remove item');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    quantity,
    isLoading: isLoading || sendCartLoading || priceLoading,
    handleIncrease,
    handleDecrease,
    isMinQuantity: !enableRemove && quantity === 1,
  };
};
