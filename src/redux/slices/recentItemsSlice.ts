// src/features/favorite/recentItems.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTokenFromCookies } from '@/features/auth/lib';
import { saveToSessionStorage } from '@/features/storage/lib';
import { RecentItemsProduct, RecentItemsState } from '@/types/Store/RecentItems/RecentItemsState';
import { Product } from '@/types/Product/Product';

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
        // Remove the item if it already exists
        state.recentItems = state.recentItems.filter(item => item.id !== action.payload.id);
        
        // Add the item to the beginning of the array with current visit time
        state.recentItems.unshift({ ...action.payload, visitTime: new Date() });
        
        // Keep only the last 20 items
        if (state.recentItems.length > 20) {
          state.recentItems = state.recentItems.slice(0, 20);
        }
        
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
