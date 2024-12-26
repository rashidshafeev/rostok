import { UserState } from '@/types/Store/User/UserState';
import { getTokenFromCookies, saveTokenToCookies } from '@/features/auth/lib';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState : UserState = {
  token: getTokenFromCookies(),
}

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

export const {
  setToken
} = userSlice.actions;
export default userSlice.reducer;
