import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryTree: null,
  loading: false,
  error: null,
};

export const categoryTreeSlice = createSlice({
  name: 'categoryTree',
  initialState,
  reducers: {
    fetchCategoryTreeStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCategoryTreeSuccess: (state, action) => {
      
      state.categoryTree = action.payload;
      state.loading = false;
    },
    fetchCategoryTreeFail: (state) => {
      state.loading = true;
      state.error = false;
    }
  },
});

export const {
  fetchCategoryTreeStart,
  fetchCategoryTreeSuccess,
  fetchCategoryTreeFail
} = categoryTreeSlice.actions;
export default categoryTreeSlice.reducer;
