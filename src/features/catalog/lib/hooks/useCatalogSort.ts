import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSort, selectSort } from '../../model';
import { CatalogQueryParamsUtil } from '../utils';

import type { OrderBy, SortOrder } from '@/entities/filter';

export const useCatalogSort = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sort = useSelector(selectSort);

  const handleSortChange = useCallback(
    (orderBy: OrderBy, sortOrder: SortOrder) => {
      dispatch(setSort({ orderBy, sortOrder }));

      // Update URL params
      const currentParams = CatalogQueryParamsUtil.parseQueryParams(window.location.search);
      const newParams = {
        ...currentParams,
        orderBy,
        sortOrder,
      };
      const queryString = CatalogQueryParamsUtil.buildQueryParams(newParams);
      navigate(`?${queryString}`, { replace: true });
    },
    [dispatch, navigate]
  );

  return {
    sort,
    handleSortChange,
  };
};
