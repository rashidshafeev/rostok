import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchComparison,
  setComparison,
  toggleComparison,
} from './slices/comparisonSlice';
import {
  fetchFavorite,
  setFavorite,
  toggleFavorite,
} from './slices/favoriteSlice';
import {
  addToCart,
  changeQuantity,
  fetchCart,
  removeFromCart,
  selectItem,
  setCart,
} from './slices/cartSlice';
import { api } from './api/api';


export const listenerMiddleware = createListenerMiddleware();

// Utility function to save to session storage
const saveToSession = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};


// Utility function to save to server
const saveToServer = async (key, data, listenerApi) => {
  const { useSendCartMutation, useSendComparisonMutation, useSendFavoritesMutation } = api;
  const actionsMap = {
    cart: useSendCartMutation,
    comparison: useSendComparisonMutation,
    favorite: useSendFavoritesMutation,
  };

  const [sendDataMutation] = actionsMap[key]();
  await sendDataMutation(data);
};

// Listener for cart actions
listenerMiddleware.startListening({
  matcher: isAnyOf(addToCart, removeFromCart, changeQuantity, selectItem, setCart),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const token = state.user.token;

    if (token) {
      try {
        await saveToServer('cart', state.cart.cart, listenerApi);
      } catch (error) {
        console.error('Error saving cart to server:', error);
      }
    } else {
      saveToSession('cart', state.cart);
    }
  },
});

// Listener for favorite actions
listenerMiddleware.startListening({
  actionCreator: toggleFavorite,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const token = state.user.token;
    let favorite = state.favorite.favorite;

    if (token) {
      try {
        saveToServer('favorite', favorite, listenerApi);
      } catch (error) {
        console.error('Error saving favorite to server:', error);
      }
    } else {
      saveToSession('favorite', favorite);
    }
  },
});

// Listener for comparison actions
listenerMiddleware.startListening({
  actionCreator: toggleComparison,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const token = state.user.token;
    let comparison = state.comparison.comparison;

    if (token) {
      try {
        saveToServer('comparison', comparison, listenerApi);
      } catch (error) {
        console.error('Error saving comparison to server:', error);
      }
    } else {
      saveToSession('comparison', comparison);
    }
  },
});


// Listener to fetch data from session storage if no token on first load
listenerMiddleware.startListening({
  matcher: isAnyOf(fetchCart, fetchComparison, fetchFavorite),
  effect: (action, listenerApi) => {
    const token = listenerApi.getState().user.token;

    if (!token) {
      if (action.type === fetchCart.type) {
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        listenerApi.dispatch(setCart(cart ? cart : { cart: [], selected: [], itemsQuantity: 0, selectedQuantity: 0 }));
      } else if (action.type === fetchComparison.type) {
        const comparison = JSON.parse(sessionStorage.getItem('comparison'));
        listenerApi.dispatch(setComparison(comparison ? comparison : []));
      } else if (action.type === fetchFavorite.type) {
        const favorite = JSON.parse(sessionStorage.getItem('favorite'));
        listenerApi.dispatch(setFavorite(favorite ? favorite : []));
      }
    }
  },
});