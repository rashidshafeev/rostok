// src/entities/user/model/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

import {
  getTokenFromCookies,
  saveTokenToCookies,
  removeTokenFromCookies,
} from '../lib/cookies';

import type { User, UserState } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  token: null,
  isAuthenticated: false,
  isInitialized: false,
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const token = getTokenFromCookies();
      state.token = token;
      state.isAuthenticated = !!token;
      state.isInitialized = true;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        saveTokenToCookies(action.payload);
        state.token = action.payload;
        state.isAuthenticated = true;
      } else {
        removeTokenFromCookies();
        state.token = null;
        state.isAuthenticated = false;
        state.data = null;
      }
      // Always set isInitialized to true after any auth action
      state.isInitialized = true;
    },
    logout: (state) => {
      removeTokenFromCookies();
      state.token = null;
      state.isAuthenticated = false;
      state.isInitialized = false; // Reset initialization flag
      state.data = null;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
});

export const { initializeAuth, setToken, logout, setUserData } = userSlice.actions;
export default userSlice.reducer;
