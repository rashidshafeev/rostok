import { createSlice } from '@reduxjs/toolkit';

import { productEndpoints } from '@/entities/product/api/productApi';
import { OrderBy, SortOrder } from '@/types/ServerData/Catalog';

import type { CatalogState } from './types';
import type { FiltersState } from '@/entities/filter/Filters/FiltersState';
import type { SortingParams } from '@/types/ServerData/Catalog';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: CatalogState = {
  filters: {
    basics: {
      price: false,
      tags: [],
      brands: [],
      rating: [],
    },
    dynamics: [],
    more: [],
  },
  sorting: {
    orderBy: OrderBy.popularity,
    sortOrder: SortOrder.desc,
  },
  pagination: {
    page: 1,
    limit: 20,
  },
  categoryId: null,
  isFiltersLoading: false,
  isProductsLoading: false,
  products: null,
  availableFilters: null,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<SortingParams>) => {
      state.sorting = action.payload;
      state.pagination.page = 1; // Reset page when sorting changes
    },
    setFilters: (state, action: PayloadAction<FiltersState>) => {
      state.filters = action.payload;
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<string | null>) => {
      state.categoryId = action.payload;
      // Reset filters but keep sorting when category changes
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    resetState: (state) => {
      return { ...initialState, sorting: state.sorting }; // Preserve sorting on reset
    },
  },
  extraReducers: (builder) => {
    builder
      // Filters loading states
      .addMatcher(
        productEndpoints.endpoints.getFilters.matchPending,
        (state) => {
          state.isFiltersLoading = true;
        }
      )
      .addMatcher(
        productEndpoints.endpoints.getFilters.matchFulfilled,
        (state, action) => {
          state.isFiltersLoading = false;
          state.availableFilters = action.payload;
        }
      )
      .addMatcher(
        productEndpoints.endpoints.getFilters.matchRejected,
        (state) => {
          state.isFiltersLoading = false;
        }
      )
      // Products loading states
      .addMatcher(
        productEndpoints.endpoints.getVariants.matchPending,
        (state) => {
          state.isProductsLoading = true;
        }
      )
      .addMatcher(
        productEndpoints.endpoints.getVariants.matchFulfilled,
        (state, action) => {
          state.isProductsLoading = false;
          state.products = action.payload;
        }
      )
      .addMatcher(
        productEndpoints.endpoints.getVariants.matchRejected,
        (state) => {
          state.isProductsLoading = false;
        }
      );
  },
});

export const { setSorting, setFilters, setPage, setCategoryId, resetState } =
  catalogSlice.actions;

export default catalogSlice.reducer;
