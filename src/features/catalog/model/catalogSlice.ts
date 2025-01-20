// src/features/catalog/model/slice.ts

import { createSlice } from '@reduxjs/toolkit';

import { catalogApi } from './api';

import type {
  CatalogState,
  CatalogSortType,
  CatalogViewType,
  FilterUpdatePayload,
} from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

const loadSavedView = (): CatalogViewType['type'] => {
  const saved = localStorage.getItem('cardView');
  return (saved as CatalogViewType['type']) || 'tile';
};

const initialState: CatalogState = {
  products: {
    ids: [],
    entities: {},
  },
  filters: {
    basics: {
      price: {
        min: 0,
        max: 0,
      },
      tags: [],
      brands: [],
      rating: [],
    },
    dynamics: [],
    more: [],
  },
  sort: {
    orderBy: 'popularity',
    sortOrder: 'desc',
  },
  view: {
    type: loadSavedView(),
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
  isFiltersLoading: false,
  isProductsLoading: false,
  filtersModalOpen: false,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<CatalogSortType>) => {
      state.sort = action.payload;
      state.pagination.page = 1; // Reset page when sort changes
    },
    setView: (state, action: PayloadAction<CatalogViewType['type']>) => {
      state.view.type = action.payload;
      localStorage.setItem('cardView', action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setFiltersModalOpen: (state, action: PayloadAction<boolean>) => {
      state.filtersModalOpen = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    updateFilter: (state, action: PayloadAction<FilterUpdatePayload>) => {
      const { filter, value } = action.payload;
      state.filters[filter] = value;
      state.pagination.page = 1; // Reset page when filters change
    },
    setFiltersLoading: (state, action: PayloadAction<boolean>) => {
      state.isFiltersLoading = action.payload;
    },
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.isProductsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getFilters
      .addMatcher(catalogApi.endpoints.getFilters.matchPending, (state) => {
        state.isFiltersLoading = true;
      })
      .addMatcher(
        catalogApi.endpoints.getFilters.matchFulfilled,
        (state, action) => {
          state.isFiltersLoading = false;
          state.filters = action.payload;
        }
      )
      .addMatcher(catalogApi.endpoints.getFilters.matchRejected, (state) => {
        state.isFiltersLoading = false;
      })
      // Handle getProducts
      .addMatcher(catalogApi.endpoints.getProducts.matchPending, (state) => {
        state.isProductsLoading = true;
      })
      .addMatcher(
        catalogApi.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          state.isProductsLoading = false;
          state.products.ids = action.payload.data.map((product) => product.id);
          state.products.entities = action.payload.data.reduce(
            (acc, product) => {
              acc[product.id] = product;
              return acc;
            },
            {}
          );
          state.pagination.total = action.payload.count;
        }
      )
      .addMatcher(catalogApi.endpoints.getProducts.matchRejected, (state) => {
        state.isProductsLoading = false;
      });
  },
});

export const {
  setSort,
  setView,
  setPage,
  setFiltersModalOpen,
  resetFilters,
  updateFilter,
  setFiltersLoading,
  setProductsLoading,
} = catalogSlice.actions;

export default catalogSlice.reducer;
