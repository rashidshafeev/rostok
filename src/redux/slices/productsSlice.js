import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: null,
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductStart: (state, action) => {
      console.log('action', action)
      state.loading = true;
      state.error = false;
    },
    fetchProductSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductFail: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCategoryProductsStart: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    fetchCategoryProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchCategoryProductsFail: (state) => {
      state.loading = true;
      state.error = false;
    }

  },
});

export const {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFail,
} = productsSlice.actions;
export default productsSlice.reducer;
