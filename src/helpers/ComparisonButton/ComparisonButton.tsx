// src/components/ComparisonButton.js
import type React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  useGetComparisonQuery,
  useRemoveFromComparisonMutation,
  useSendComparisonMutation,
} from '@/redux/api/comparisonEndpoints';
import { getTokenFromCookies } from '@/shared/lib';
import {
  addToComparison,
  removeFromComparison,
} from '@store/slices/comparisonSlice';

import type { Product } from '@/entities/product/Product';
import type { AppDispatch, RootState } from '@store/store';

type ComparisonButtonProps = {
  product: Product;
  children: (renderProps: {
    isLoading: boolean;
    isInComparison: boolean;
    handleComparisonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }) => React.ReactNode;
};

const ComparisonButton = ({ product, children }: ComparisonButtonProps) => {
  const dispatch: AppDispatch = useDispatch();
  const token = getTokenFromCookies();

  const { comparison } = useSelector((state: RootState) => state.comparison);
  const isInComparison = comparison.some((el) => el.id === product?.id);

  const [sendComparisonMutation, { isLoading: sendIsLoading }] =
    useSendComparisonMutation();
  const [removeFromComparisonMutation, { isLoading: removeIsLoading }] =
    useRemoveFromComparisonMutation();
  const isLoading = sendIsLoading || removeIsLoading;

  const handleComparisonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInComparison) {
      if (token) {
        removeFromComparisonMutation({ id: product.id });
      }
      dispatch(removeFromComparison(product));
    } else {
      if (token) {
        sendComparisonMutation({ id: product.id });
      }
      dispatch(addToComparison(product));
    }
  };

  return children({ isLoading, isInComparison, handleComparisonClick });
};

export default ComparisonButton;
