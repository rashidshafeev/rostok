import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const saveTokenToLocalStorage = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token') || null;
};


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
    token: getTokenFromLocalStorage(),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      saveTokenToLocalStorage(action.payload);
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
