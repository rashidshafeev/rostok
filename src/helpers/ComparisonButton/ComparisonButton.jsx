// src/components/ComparisonButton.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToComparison, removeFromComparison } from '../../redux/slices/comparisonSlice';
import { useGetComparisonQuery, useRemoveFromComparisonMutation, useSendComparisonMutation } from '../../redux/api/comparisonEndpoints';
import { getTokenFromCookies } from '../cookies/cookies';

const ComparisonButton = ({ product, children }) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const { comparison } = useSelector((state) => state.comparison);
  
  // Fetching favorites from the server if the user is logged in
  // const { data: serverComparison } = useGetComparisonQuery(undefined, { skip: !token });

  const [sendComparisonMutation, {isLoading: sendIsLoading}] = useSendComparisonMutation();
  const [removeFromComparisonMutation, {isLoading: removeIsLoading}] = useRemoveFromComparisonMutation();
  const isLoading = sendIsLoading || removeIsLoading;

  const isInComparison = comparison.some((el) => el.id === product.id);
  // const isInComparison = token
  //   ? serverComparison?.data?.some((el) => el.id === product.id)
  //   : comparison.some((el) => el.id === product.id);

  // const handleComparisonClick = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation()
    
  //   if (isInComparison) {
  //     token ?   removeFromComparisonMutation(product) : dispatch(removeFromComparison(product))

  //   } else {
  //     token ? sendComparisonMutation(product) : dispatch(addToComparison(product))
  //   }
  // };

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