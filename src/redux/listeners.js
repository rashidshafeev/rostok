import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { fetchComparison, setComparison, toggleComparison } from "./slices/comparisonSlice";
import { fetchFavorite, setFavorite, toggleFavorite } from "./slices/favoriteSlice";
import { addToCart, changeQuantity, fetchCart, removeFromCart, selectItem, setCart } from "./slices/cartSlice";


export const listenerMiddleware = createListenerMiddleware()

// listenerMiddleware.startListening({
//   matcher: isAnyOf(toggleFavorite, toggleComparison, addToCart, removeFromCart),
//   effect: async (action, listenerApi) => {
//     const state = listenerApi.getState()

//     if (action.type === 'cart/addToCart' || action.type === 'cart/removeFromCart') {
//       console.log('cart synch')
//       try {
//         const result = await listenerApi.dispatch(api.endpoints.setCart.initiate({ ...state.cart.cart}));
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   }
// })

listenerMiddleware.startListening({
  actionCreator: fetchFavorite,
  effect: (action, listenerApi) => {
    const favorite = JSON.parse(sessionStorage.getItem('favorite'));
    listenerApi.dispatch(setFavorite(favorite ? favorite : []));
  },
});

listenerMiddleware.startListening({
  actionCreator: toggleFavorite,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()
    let favorite = state.favorite.favorite
    
    sessionStorage.setItem('favorite', JSON.stringify(favorite));
  },
});

listenerMiddleware.startListening({
  actionCreator: fetchComparison,
  effect: (action, listenerApi) => {
    const comparison = JSON.parse(sessionStorage.getItem('comparison'));
    listenerApi.dispatch(setComparison(comparison ? comparison : []));
  },
});


listenerMiddleware.startListening({
  actionCreator: toggleComparison,
  effect: (action, listenerApi) => {
    
    const state = listenerApi.getState()
    let comparison = state.comparison.comparison

    sessionStorage.setItem('comparison', JSON.stringify(comparison));
  },
});



listenerMiddleware.startListening({
  actionCreator: fetchCart,
  effect: (action, listenerApi) => {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log("cart", cart)
    listenerApi.dispatch(setCart(cart ? cart : []));
  },
});

listenerMiddleware.startListening({
    matcher: isAnyOf(addToCart, removeFromCart, changeQuantity, selectItem),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()
    let cart = state.cart

    sessionStorage.setItem('cart', JSON.stringify(cart));
  },
});
