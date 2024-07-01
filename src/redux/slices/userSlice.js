import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  token: null,
};

const saveTokenToCookies = (token) => {
  if (token) {
    Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
  } else {
    Cookies.remove('token');
  }
};

const getTokenFromCookies = () => {
  return Cookies.get('token') || null;
};


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: getTokenFromCookies(),
  },
  reducers: {
    setToken: (state, action) => {
      console.log('tokenchanged');
      state.token = action.payload;
      saveTokenToCookies(action.payload);
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = false;
    },
    registerFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = false;
      saveTokenToLocalStorage(action.payload.token);
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      saveTokenToLocalStorage(null);
    },
  },
});

export const {
  setToken,
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
} = userSlice.actions;
export default userSlice.reducer;
