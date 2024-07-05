// src/components/ComparisonButton.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToComparison, removeFromComparison } from '../../redux/slices/comparisonSlice';
import { useGetComparisonQuery } from '../../redux/api/comparisonEndpoints';
import { getTokenFromCookies } from '../cookies/cookies';

const ComparisonButton = ({ product, children }) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const { comparison } = useSelector((state) => state.comparison);
  
  // Fetching favorites from the server if the user is logged in
  const { data: serverComparison } = useGetComparisonQuery(undefined, { skip: !token });

  const isInComparison = token
    ? serverComparison?.data?.some((el) => el.id === product.id)
    : comparison.some((el) => el.id === product.id);

  const handleComparisonClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    
    if (isInComparison) {
      dispatch(removeFromComparison(product));
    } else {
      dispatch(addToComparison(product));
    }
  };

  return children({ isInComparison, handleComparisonClick });
};

export default ComparisonButton;