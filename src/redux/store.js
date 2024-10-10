import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import { listenerMiddleware } from './listeners';
import delayMiddleware from './middleware/delayMiddleware';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import favoriteReducer from './slices/favoriteSlice';
import comparisonReducer from './slices/comparisonSlice';
import organizationsReducer from './slices/organizationsSlice';
import filtersReducer from './slices/filtersSlice';
import recentItemsReducer from './slices/recentItemsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  comparison: comparisonReducer,
  organizations: organizationsReducer,
  filters: filtersReducer,
  recentItems: recentItemsReducer,
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
