// src/features/cart/model/hooks/useRemoveFromCart.ts
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { useSendCartMutation } from '@/features/cart';
import { useModal } from '@/features/modals/model/context';
import { getTokenFromCookies } from '@/entities/user';

import { removeFromCart } from '../cartSlice';

import { useCartSelection } from './useCartSelection';

import type { Product } from '@/entities/product';

interface UseRemoveFromCartOptions {
  withConfirmation?: boolean;
}

interface UseRemoveFromCartReturn {
  handleRemove: (e: React.MouseEvent) => void;
  isLoading: boolean;
}

export const useRemoveFromCart = (
  product: Product,
  options: UseRemoveFromCartOptions = {}
): UseRemoveFromCartReturn => {
  const { withConfirmation = false } = options;
  const { showModal } = useModal();
  const { selectedItems } = useCartSelection();

  const token = getTokenFromCookies();
  const dispatch = useDispatch();
  const [sendCart, { isLoading: sendCartLoading }] = useSendCartMutation();
  const [isRemoving, setIsRemoving] = useState(false);

  const remove = async () => {
    setIsRemoving(true);
    try {
      // Optimistically remove from local state
      dispatch(removeFromCart(product));

      if (token) {
        const result = await sendCart({
          id: product.id,
          quantity: 0,
          selected: 0,
        });
        console.log('result', result);
        if ('error' in result) {
          // Revert on error
          dispatch(addToCart(product));
          toast.error('Failed to remove product');
        }
      }
    } catch (error) {
      // Revert on error
      dispatch(addToCart(product));
      toast.error('Failed to remove product');
    } finally {
      setIsRemoving(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();

    if (withConfirmation) {
      showModal({
        type: 'confirmation',
        title: 'Удаление',
        text: 'Удалить товар из корзины?',
        action: () => remove(),
        product,
      });
      return;
    }

    remove();
  };

  const handleRemoveSelected = async () => {
    if (!selectedItems.length) return;
    
    setIsRemoving(true);
    
    try {
      const payload = selectedItems.map((item) => ({
        id: item.id,
        quantity: 0,
        selected: 0,
      }));

      // Optimistically remove all items from local state
      selectedItems.forEach((item) => dispatch(removeFromCart(item)));

      // Server sync for logged in users
      if (token) {
        const result = await sendCart({ items: payload });
        if ('error' in result) {
          // Revert on error
          selectedItems.forEach((item) => dispatch(addToCart(item)));
          toast.error('Failed to remove selected items');
        }
      }
    } catch (error) {
      // Revert on error
      selectedItems.forEach((item) => dispatch(addToCart(item)));
      toast.error('Failed to remove selected items');
    } finally {
      setIsRemoving(false);
    }
  };
  return {
    handleRemove,
    handleRemoveSelected,
    isLoading: isRemoving || sendCartLoading,
  };
};
