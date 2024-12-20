import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export const selectCatalogState = (state: RootState) => state.catalog;

export const selectFilters = createSelector(
  selectCatalogState,
  (catalog) => catalog.filters
);

export const selectSorting = createSelector(
  selectCatalogState,
  (catalog) => catalog.sorting
);

export const selectPagination = createSelector(
  selectCatalogState,
  (catalog) => catalog.pagination
);

export const selectProducts = createSelector(
  selectCatalogState,
  (catalog) => catalog.products
);

export const selectAvailableFilters = createSelector(
  selectCatalogState,
  (catalog) => catalog.availableFilters
);

export const selectLoadingStates = createSelector(
  selectCatalogState,
  (catalog) => ({
    isFiltersLoading: catalog.isFiltersLoading,
    isProductsLoading: catalog.isProductsLoading
  })
);

// Computed selectors
export const selectCurrentCategoryId = createSelector(
  selectCatalogState,
  (catalog) => catalog.categoryId
);

export const selectTotalPages = createSelector(
  selectProducts,
  selectPagination,
  (products, pagination) => 
    products ? Math.ceil(products.count / pagination.limit) : 0
);
