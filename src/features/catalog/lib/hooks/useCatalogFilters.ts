import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetFiltersMutation } from '@/entities/filter';
import { CatalogQueryParamsUtil } from '../utils';

import {
  updateFilter,
  setFiltersLoading,
  resetFilters,
  selectFilters,
  selectIsFiltersLoading,
} from '../../model';

import type { FilterUpdatePayload } from '@/shared/types';

export const useCatalogFilters = (categoryId: string | null) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector(selectFilters);
  const isLoading = useSelector(selectIsFiltersLoading);

  const [getFilters] = useGetFiltersMutation();

  const updateFilters = useCallback(
    async (payload: FilterUpdatePayload) => {
      dispatch(setFiltersLoading(true));

      try {
        const newFilters = { ...filters };
        // Update filter state based on payload type
        switch (payload.type) {
          case 'price':
            newFilters.basics.price.current_values = payload.value;
            break;
          case 'brand':
            newFilters.basics.brands = newFilters.basics.brands.map(brand =>
              brand.id === payload.id ? { ...brand, is_selected: !brand.is_selected } : brand
            );
            break;
          case 'tag':
            newFilters.basics.tags = newFilters.basics.tags.map(tag =>
              tag.tag === payload.id ? { ...tag, is_selected: !tag.is_selected } : tag
            );
            break;
          case 'dynamic':
            newFilters.dynamics = newFilters.dynamics.map(filter => {
              if (filter.id === payload.filterId) {
                return {
                  ...filter,
                  values: filter.values.map(value =>
                    value.id === payload.id ? { ...value, is_selected: !value.is_selected } : value
                  ),
                };
              }
              return filter;
            });
            break;
        }

        // Get updated filters from API
        const response = await getFilters({
          ...CatalogQueryParamsUtil.createApiPayload(newFilters),
          category_id: categoryId,
        });

        if ('data' in response) {
          // Update URL params
          const queryParams = CatalogQueryParamsUtil.buildQueryParams({
            ...newFilters,
            category_id: categoryId,
          });
          navigate(`?${queryParams}`, { replace: true });

          // Update state
          dispatch(updateFilter({ filter: 'basics', value: response.data.basics }));
          
          if (response.data.dynamics || response.data.more) {
            dispatch(updateFilter({
              filter: 'dynamics',
              value: [
                ...response.data.dynamics,
                ...(response.data.more?.map(item => ({
                  ...item,
                  additional_filter: true,
                })) || []),
              ],
            }));
          }
        }
      } catch (error) {
        console.error('Failed to update filters:', error);
        toast.error('Не удалось обновить фильтры');
      } finally {
        dispatch(setFiltersLoading(false));
      }
    },
    [dispatch, categoryId, filters, getFilters, navigate]
  );

  const handleReset = useCallback(async () => {
    dispatch(resetFilters());

    try {
      const response = await getFilters({ category_id: categoryId });

      if ('data' in response) {
        navigate('?', { replace: true });
        dispatch(updateFilter({ filter: 'basics', value: response.data.basics }));
        
        if (response.data.dynamics || response.data.more) {
          dispatch(updateFilter({
            filter: 'dynamics',
            value: [
              ...response.data.dynamics,
              ...(response.data.more?.map(item => ({
                ...item,
                additional_filter: true,
              })) || []),
            ],
          }));
        }
      }
    } catch (error) {
      console.error('Failed to reset filters:', error);
      toast.error('Не удалось сбросить фильтры');
    }
  }, [dispatch, categoryId, getFilters, navigate]);

  return {
    filters,
    isLoading,
    updateFilters,
    handleReset,
  };
};



