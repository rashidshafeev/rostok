// src/features/favorite/recentItems.ts
import { createSlice } from '@reduxjs/toolkit';
import { getTokenFromCookies, saveToSessionStorage } from '../../helpers/cookies/cookies';

const initialState = {
  recentItems: [],
  loading: false,
  error: null,
};

export const recentItems = createSlice({
  name: 'recentItems',
  initialState,
  reducers: {
    fetchRecentItems: (state) => {
      // No need to handle token here, as it's for initial fetch
    },
    setRecentItems: (state, action) => {
      state.recentItems = action.payload || [];
    },
    addToRecentItems: (state, action) => {
      const token = getTokenFromCookies();
      if (!token) {
        state.recentItems.push({ ...action.payload });
        
        saveToSessionStorage('recentItems', state.recentItems);
      }
    },
    removeFromRecentItems: (state, action) => {
      const token = getTokenFromCookies();
      if (!token) {
        state.recentItems = state.recentItems.filter((item) => item.id !== action.payload.id);

        saveToSessionStorage('recentItems', state.recentItems);
      }
    },
  },
});

export const { 
    fetchRecentItems,
  setRecentItems,
  addToRecentItems,
  removeFromRecentItems,
} = recentItems.actions;
export default recentItems.reducer;

