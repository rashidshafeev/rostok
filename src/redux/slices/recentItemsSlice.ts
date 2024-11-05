// src/features/favorite/recentItems.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTokenFromCookies, saveToSessionStorage } from '@helpers/cookies/cookies';
import { RecentItemsProduct, RecentItemsState } from '@customTypes/Store/RecentItems/RecentItemsState';
import { Product } from '@customTypes/Product/Product';

const initialState: RecentItemsState = {
  recentItems: [],
};

export const recentItems = createSlice({
  name: 'recentItems',
  initialState,
  reducers: {
    setRecentItems: (state, action: PayloadAction<RecentItemsProduct[]>) => {
      state.recentItems = action.payload || [];
    },
    addToRecentItems: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      if (!token) {
        state.recentItems.push({ ...action.payload, visitTime: new Date() });
        
        saveToSessionStorage('recentItems', state.recentItems);
      }
    },
    removeFromRecentItems: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      if (!token) {
        state.recentItems = state.recentItems.filter((item) => item.id !== action.payload.id);

        saveToSessionStorage('recentItems', state.recentItems);
      }
    },
  },
});

export const {
  setRecentItems,
  addToRecentItems,
  removeFromRecentItems,
} = recentItems.actions;
export default recentItems.reducer;

