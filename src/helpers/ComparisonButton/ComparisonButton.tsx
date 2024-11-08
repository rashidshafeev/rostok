// src/components/ComparisonButton.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToComparison, removeFromComparison } from '../../redux/slices/comparisonSlice';
import { useGetComparisonQuery, useRemoveFromComparisonMutation, useSendComparisonMutation } from '../../redux/api/comparisonEndpoints';
import { getTokenFromCookies } from '../cookies/cookies';
import { Product } from '@customTypes/Product/Product';
import { AppDispatch, RootState } from '@/redux/store';

type ComparisonButtonProps = {
  product: Product,
  children: (renderProps: {
    isLoading: boolean,
    isInComparison: boolean,
    handleComparisonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  }) => React.ReactNode,
}


const ComparisonButton = ({ product, children } : ComparisonButtonProps) => {

  const dispatch : AppDispatch = useDispatch();
  const token = getTokenFromCookies();
  const { comparison } = useSelector((state : RootState) => state.comparison);

  const [sendComparisonMutation, {isLoading: sendIsLoading}] = useSendComparisonMutation();
  const [removeFromComparisonMutation, {isLoading: removeIsLoading}] = useRemoveFromComparisonMutation();
  const isLoading = sendIsLoading || removeIsLoading;

  const isInComparison = comparison.some((el) => el.id === product.id);
  const handleComparisonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInComparison) {
    if (token) {
      removeFromComparisonMutation(product)
    } 
      dispatch(removeFromComparison(product))
    } else {
      if (token) {
        sendComparisonMutation(product)
      } 
      dispatch(addToComparison(product));
    }
  };

  return children({ isLoading, isInComparison, handleComparisonClick });
};

export default ComparisonButton;