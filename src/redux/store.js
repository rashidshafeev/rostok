import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import { api } from './api/api';
import favoriteReducer from './slices/favoriteSlice';
import comparisonReducer from './slices/comparisonSlice';
import organizationsReducer from './slices/organizationsSlice';
import { listenerMiddleware } from './listeners';
import delayMiddleware from './middleware/delayMiddleware';

const rootReducer = combineReducers({
  user: userReducer,
  product: productsReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  comparison: comparisonReducer,
  organizations: organizationsReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .prepend(listenerMiddleware.middleware)
      .concat(api.middleware),
      // .concat(delayMiddleware, api.middleware),
});

export default store;
