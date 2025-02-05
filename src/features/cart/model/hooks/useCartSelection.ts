// src/features/cart/model/hooks/useCartSelection.ts
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import { useSendCartMutation } from '@/features/cart';
import { getTokenFromCookies } from '@/entities/user';

import { selectItem, unselectItem } from '../cartSlice';

import type { AppDispatch, RootState } from '@/app/providers/store';
import type { CartProduct, SendCartPayload } from '@/features/cart';

export const useCartSelection = () => {
  const token = getTokenFromCookies();
  const dispatch: AppDispatch = useDispatch();
  const [sendCart] = useSendCartMutation();
  const [isUpdating, setIsUpdating] = useState(false);

  const cart = useSelector((state: RootState) => state.cart);
  const selectedItems = cart?.cart?.filter(
    (item) => item.selected === true || item.selected.toString() === '1'
  );

  // Handle selection for single item
  const handleItemSelection = async (
    product: CartProduct,
    selected: boolean
  ) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      // Optimistic update
      dispatch(selected ? selectItem(product) : unselectItem(product));

      // Server sync for logged in users
      if (token) {
        const result = await sendCart({
          id: product.id,
          quantity: product.quantity,
          selected: selected ? true : false,
        });

        if ('error' in result) {
          // Revert on error
          dispatch(selected ? unselectItem(product) : selectItem(product));
          toast.error('Failed to update selection');
        }
      }
    } catch (error) {
      // Revert on error
      dispatch(selected ? unselectItem(product) : selectItem(product));
      toast.error('Failed to update selection');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle batch selection for multiple items
  const handleBatchSelection = async (
    items: CartProduct[],
    selected: boolean
  ) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      // Optimistic update
      items.forEach((item) =>
        dispatch(selected ? selectItem(item) : unselectItem(item))
      );

      // Server sync for logged in users
      if (token) {
        const payload: SendCartPayload[] = items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          selected: selected ? true : false,
        }));

        const result = await sendCart({ items: payload });

        if ('error' in result) {
          // Revert on error
          items.forEach((item) =>
            dispatch(selected ? unselectItem(item) : selectItem(item))
          );
          toast.error('Failed to update selection');
        }
      }
    } catch (error) {
      // Revert on error
      items.forEach((item) =>
        dispatch(selected ? unselectItem(item) : selectItem(item))
      );
      toast.error('Failed to update selection');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle select/deselect all
  const handleSelectAll = async (selected: boolean) => {
    const itemsToUpdate = selected
      ? cart?.cart?.filter((item) => !item.selected) || []
      : selectedItems;

    await handleBatchSelection(itemsToUpdate, selected);
  };



  const isAllSelected =
    cart?.cart?.length > 0 && cart?.cart?.length === selectedItems?.length;

  return {
    selectedItems,
    isUpdating,
    isAllSelected,
    handleItemSelection,
    handleBatchSelection,
    handleSelectAll,
  };
};
