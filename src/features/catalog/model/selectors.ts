// src/features/catalog/model/selectors.ts

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/providers/store';

// Base selector
export const selectCatalogState = (state: RootState) => state.catalog;

// Products selectors
export const selectCatalogProducts = createSelector(
  selectCatalogState,
  (catalog) => catalog.products
);

export const selectProductsList = createSelector(
  selectCatalogProducts,
  (products) => products.ids.map((id) => products.entities[id])
);

// Filters selectors
export const selectCatalogFilters = createSelector(
  selectCatalogState,
  (catalog) => catalog.filters
);

// Sort selectors
export const selectCatalogSort = createSelector(
  selectCatalogState,
  (catalog) => catalog.sort
);

// View selectors
export const selectCatalogView = createSelector(
  selectCatalogState,
  (catalog) => catalog.view
);

// Pagination selectors
export const selectCatalogPagination = createSelector(
  selectCatalogState,
  (catalog) => catalog.pagination
);

// Loading state selectors
export const selectIsFiltersLoading = createSelector(
  selectCatalogState,
  (catalog) => catalog.isFiltersLoading
);

export const selectIsProductsLoading = createSelector(
  selectCatalogState,
  (catalog) => catalog.isProductsLoading
);

export const selectCatalogLoadingStates = createSelector(
  selectCatalogState,
  (catalog) => ({
    isFiltersLoading: catalog.isFiltersLoading,
    isProductsLoading: catalog.isProductsLoading,
  })
);

// Modal state selectors
export const selectFiltersModalOpen = createSelector(
  selectCatalogState,
  (catalog) => catalog.filtersModalOpen
);

// Combined/derived selectors
export const selectCatalogStatus = createSelector(
  [selectIsFiltersLoading, selectIsProductsLoading],
  (isFiltersLoading, isProductsLoading) => ({
    isLoading: isFiltersLoading || isProductsLoading,
    isFiltersLoading,
    isProductsLoading,
  })
);

export const selectActiveFiltersCount = createSelector(
  selectCatalogFilters,
  (filters) => {
    let count = 0;

    // Count selected brands
    count += filters.basics?.brands?.filter(brand => brand.is_selected).length || 0;

    // Count selected tags
    count += filters.basics?.tags?.filter(tag => tag.is_selected).length || 0;

    // Count price filter if set
    if (filters.basics?.price?.current_values) {
      count += 1;
    }

    // Count dynamic filters
    filters.dynamics?.forEach(filter => {
      count += filter.values.filter(value => value.is_selected).length;
    });

    return count;
  }
);