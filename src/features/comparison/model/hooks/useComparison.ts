import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import {
  useSendComparisonMutation,
  useRemoveFromComparisonMutation,
  addToComparison,
  removeFromComparison,
} from '@/features/comparison';
import { getTokenFromCookies } from '@/entities/user';

import type { Product } from '@/entities/product';

export const useComparison = (product: Product) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const comparison = useSelector((state) => state.comparison.comparison);
  const [isUpdating, setIsUpdating] = useState(false);

  const [sendComparison, { isLoading: sendLoading }] =
    useSendComparisonMutation();
  const [removeComparison, { isLoading: removeLoading }] =
    useRemoveFromComparisonMutation();

  const isInComparison = comparison.some((el) => el.id === product?.id);
  const isLoading = isUpdating || sendLoading || removeLoading;

  const handleComparisonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsUpdating(true);
    try {
      if (isInComparison) {
        // Optimistically remove from local state
        dispatch(removeFromComparison(product));
        
        if (token) {
          const result = await removeComparison({ id: product.id });
          if ('error' in result) {
            // Revert on error
            dispatch(addToComparison(product));
            toast.error('Failed to remove from comparison');
          }
        }
      } else {
        // Optimistically add to local state
        dispatch(addToComparison(product));
        
        if (token) {
          const result = await sendComparison({ id: product.id });
          if ('error' in result) {
            // Revert on error
            dispatch(removeFromComparison(product));
            toast.error('Failed to add to comparison');
          }
        }
      }
    } catch (error) {
      // Revert on error
      if (isInComparison) {
        dispatch(addToComparison(product));
      } else {
        dispatch(removeFromComparison(product));
      }
      toast.error('Failed to update comparison');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isInComparison,
    isLoading,
    handleComparisonClick,
  };
};