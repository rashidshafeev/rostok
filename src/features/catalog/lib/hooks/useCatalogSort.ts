// src/features/catalog/lib/hooks/useCatalogSort.ts

import { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSort } from '../../model/catalogSlice'; // Changed from updateSort to setSort
import { selectCatalogSort } from '../../model/selectors';

import type { OrderBy, SortOrder } from '@/entities/filter';

export const useCatalogSort = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sort = useSelector(selectCatalogSort);

  const handleSortChange = useCallback(
    (orderBy: OrderBy, sortOrder: SortOrder) => {
      dispatch(setSort({ orderBy, sortOrder }));

      // Update URL params
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('order_by', orderBy);
      searchParams.set('sort_order', sortOrder);
      navigate(`?${searchParams.toString()}`, { replace: true });
    },
    [dispatch, navigate]
  );

  return {
    sort,
    handleSortChange,
  };
};
