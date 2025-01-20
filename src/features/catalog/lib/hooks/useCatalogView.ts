// src/features/catalog/lib/hooks/useCatalogView.ts

import { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setView } from '../../model/catalogSlice';
import { selectCatalogView } from '../../model/selectors';

import type { CardViewType } from '../../model/types';

export const useCatalogView = () => {
  const dispatch = useDispatch();
  const view = useSelector(selectCatalogView);

  const handleViewChange = useCallback(
    (type: CardViewType['type']) => {
      dispatch(setView(type));
    },
    [dispatch]
  );

  return {
    view,
    handleViewChange,
  };
};
