import { useDispatch, useSelector } from 'react-redux';

import { getTokenFromCookies } from '@/shared/lib';

import {
  useSendComparisonMutation,
  useRemoveFromComparisonMutation,
} from '../../api/comparisonApi';
import { addToComparison, removeFromComparison } from '../slice';

import type { Product } from '@/entities/product';

export const useComparison = (product: Product) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const comparison = useSelector((state) => state.comparison.comparison);

  const [sendComparison, { isLoading: sendLoading }] =
    useSendComparisonMutation();
  const [removeComparison, { isLoading: removeLoading }] =
    useRemoveFromComparisonMutation();

  const isInComparison = comparison.some((el) => el.id === product?.id);
  const isLoading = sendLoading || removeLoading;

  const handleComparisonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isInComparison) {
        if (token) {
          await removeComparison({ id: product.id });
        }
        dispatch(removeFromComparison(product));
      } else {
        if (token) {
          await sendComparison({ id: product.id });
        }
        dispatch(addToComparison(product));
      }
    } catch (error) {
      console.error('Failed to update comparison:', error);
    }
  };

  return {
    isInComparison,
    isLoading,
    handleComparisonClick,
  };
};
