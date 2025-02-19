import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductsState } from './types';
import type { Product } from '@/entities/product';

interface CatalogState {
  products: ProductsState;
  isLoading: boolean;
}

const initialState: CatalogState = {
  products: {
    ids: [],
    entities: {},
  },
  isLoading: false,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products.ids = action.payload.map((product) => product.id);
      state.products.entities = action.payload.reduce(
        (acc, product) => {
          acc[product.id] = product;
          return acc;
        },
        {} as Record<number, Product>
      );
    },
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProducts, setProductsLoading } = catalogSlice.actions;

// Selectors
export const selectProducts = (state: { catalog: CatalogState }) => state.catalog.products;
export const selectIsProductsLoading = (state: { catalog: CatalogState }) => state.catalog.isLoading;

export default catalogSlice.reducer;

