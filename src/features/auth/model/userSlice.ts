import { createSlice } from '@reduxjs/toolkit';

import { getTokenFromCookies, saveTokenToCookies } from '@/shared/lib';

import type { UserState } from '@/features/auth/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  token: getTokenFromCookies(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      saveTokenToCookies(action.payload);
      state.token = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
