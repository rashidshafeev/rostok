// src/features/catalog/lib/hooks/useCatalog.ts

import { useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { CatalogQueryParamsUtil } from '@/features/filters/lib/queryParams';
import { scrollToTop } from '@/shared/lib/scrollToTop';

import { useGetFiltersMutation, useGetProductsMutation } from '../../model/api';
import {
  setSort,
  setView,
  setPage,
  setFiltersModalOpen,
  resetFilters,
} from '../../model/catalogSlice';
import {
  selectProductsList,
  selectCatalogFilters,
  selectCatalogSort,
  selectCatalogView,
  selectCatalogPagination,
  selectCatalogLoadingStates,
  selectFiltersModalOpen,
} from '../../model/selectors';

import type { OrderBy, SortOrder } from '@/entities/filter';

export const useCatalog = (categoryId: string | null) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Selectors
  const products = useSelector(selectProductsList);
  const filters = useSelector(selectCatalogFilters);
  const sort = useSelector(selectCatalogSort);
  const view = useSelector(selectCatalogView);
  const pagination = useSelector(selectCatalogPagination);
  const { isFiltersLoading, isProductsLoading } = useSelector(
    selectCatalogLoadingStates
  );
  const filtersModalOpen = useSelector(selectFiltersModalOpen);

  // API hooks
  const [getFilters] = useGetFiltersMutation();
  const [getProducts] = useGetProductsMutation();

  // Filter updates
  const updateFilters = useCallback(
    async ({ type, id, value }) => {
      const newFilters = { ...filters };

      switch (type) {
        case 'price':
          newFilters.basics.price.current_values = value;
          break;
        case 'brand':
          newFilters.basics.brands = newFilters.basics.brands.map((brand) =>
            brand.id === id ? { ...brand, is_selected: value } : brand
          );
          break;
        case 'tag':
          newFilters.basics.tags = newFilters.basics.tags.map((tag) =>
            tag.tag === id ? { ...tag, is_selected: value } : tag
          );
          break;
        case 'dynamic':
          newFilters.dynamics = newFilters.dynamics.map((filter) => {
            if (filter.id === id) {
              return {
                ...filter,
                values: filter.values.map((val) =>
                  val.id === value
                    ? { ...val, is_selected: !val.is_selected }
                    : val
                ),
              };
            }
            return filter;
          });
          break;
      }

      try {
        // Update URL
        const queryParams = CatalogQueryParamsUtil.buildQueryParams({
          ...newFilters,
          category_id: categoryId,
          sort,
          page: 1,
        });
        navigate(`?${queryParams}`, { replace: true });

        // Get new filters and products
        await Promise.all([
          getFilters({
            ...newFilters,
            category_id: categoryId,
          }),
          getProducts({
            ...newFilters,
            category_id: categoryId,
            page: 1,
            limit: pagination.limit,
            ...sort,
          }),
        ]);

        scrollToTop();
      } catch (error) {
        console.error('Failed to update filters:', error);
      }
    },
    [
      filters,
      categoryId,
      sort,
      pagination.limit,
      getFilters,
      getProducts,
      navigate,
    ]
  );

  // Sort handling
  const handleSortChange = useCallback(
    (orderBy: OrderBy, sortOrder: SortOrder) => {
      dispatch(setSort({ orderBy, sortOrder }));
    },
    [dispatch]
  );

  // View handling
  const handleViewChange = useCallback(
    (type: typeof view.type) => {
      dispatch(setView(type));
    },
    [dispatch]
  );

  // Pagination handling
  const handlePaginationChange = useCallback(
    (page: number) => {
      dispatch(setPage(page));
      scrollToTop();
    },
    [dispatch]
  );

  // Reset filters
  const handleReset = useCallback(async () => {
    dispatch(resetFilters());

    try {
      await Promise.all([
        getFilters({ category_id: categoryId }),
        getProducts({
          category_id: categoryId,
          page: 1,
          limit: pagination.limit,
          ...sort,
        }),
      ]);

      navigate('?', { replace: true });
      scrollToTop();
    } catch (error) {
      console.error('Failed to reset filters:', error);
    }
  }, [
    categoryId,
    pagination.limit,
    sort,
    getFilters,
    getProducts,
    dispatch,
    navigate,
  ]);

  // Initial load
  useEffect(() => {
    const queryParams = CatalogQueryParamsUtil.parseQueryParams(
      location.search
    );

    const loadInitialData = async () => {
      try {
        await Promise.all([
          getFilters({
            ...queryParams,
            category_id: categoryId,
          }),
          getProducts({
            ...queryParams,
            category_id: categoryId,
            limit: pagination.limit,
          }),
        ]);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      }
    };

    loadInitialData();
  }, [categoryId]);

  return {
    // State
    products,
    filters,
    sort,
    view,
    pagination,
    isFiltersLoading,
    isProductsLoading,
    filtersModalOpen,

    // Actions
    updateFilters,
    handleSortChange,
    handleViewChange,
    handlePaginationChange,
    handleReset,
    setFiltersModalOpen: (open: boolean) => dispatch(setFiltersModalOpen(open)),
  };
};
