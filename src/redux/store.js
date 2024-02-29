import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import categoryTreeReducer from './slices/categoryTreeSlice';
import filtersReducer from './slices/filtersSlice';
import cartReducer from './slices/cartSlice';
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from './sagas/rootSaga';
import productsReducer from './slices/productsSlice';

const saga = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  categoryTree: categoryTreeReducer,
  product: productsReducer,
  filters: filtersReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });


export const store = configureStore({
  // reducer: {
  //   user: userReducer,
  // catalog: catalogReducer,
  // filters: filtersReducer,
  // cart: cartReducer,
  // },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
            serializableCheck: false,
          }).concat(saga)
  },
});

saga.run(rootSaga)

export default store

export const persistor = persistStore(store);


