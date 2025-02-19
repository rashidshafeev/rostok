import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setView, selectView } from '../../model';
import type { CatalogViewType } from '../../model/types';

export const useCatalogView = () => {
  const dispatch = useDispatch();
  const view = useSelector(selectView);

  const handleViewChange = useCallback(
    (type: CatalogViewType['type']) => {
      dispatch(setView(type));
    },
    [dispatch]
  );

  return {
    view,
    handleViewChange,
  };
};

