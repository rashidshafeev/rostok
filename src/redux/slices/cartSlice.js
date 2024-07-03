import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  selected: [],
  itemsQuantity: 0,
  selectedQuantity: 0,
};

const updateQuantities = (state) => {
  state.itemsQuantity = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  state.selectedQuantity = state.cart.reduce((acc, item) => (item.selected ? acc + item.quantity : acc), 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCart: (state) => {
      // const storedCart = JSON.parse(sessionStorage.getItem('cart'));
      
      // if (storedCart) {
      //   state.cart = storedCart.cart ? storedCart.cart : [];
      //   state.selected = storedCart.selected ?? [];
      //   state.itemsQuantity = storedCart.itemsQuantity ?? 0;
      //   state.selectedQuantity = storedCart.selectedQuantity ?? 0;
      // } else {
      //   state.cart = [];
      //   state.selected = [];
      //   state.itemsQuantity = 0;
      //   state.selectedQuantity = 0;
      // }
    },
    setCart: (state, action) => {
      if (!action.payload) {
        state.cart = [];
        state.selected = [];
        state.itemsQuantity = 0;
        state.selectedQuantity = 0;
      } else {
        state.cart = action.payload.cart;
        state.selected = action.payload.selected;
        state.itemsQuantity = action.payload.itemsQuantity;
        state.selectedQuantity = action.payload.selectedQuantity;
      }
    },
    addToCart: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);

      if (product) {
        product.quantity += 1;
      } else {
        const newProduct = { ...action.payload, quantity: 1 };
        state.cart.push(newProduct);
      }

      updateQuantities(state);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload.id);
      updateQuantities(state);
    },
    changeQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.product.id);

      if (product.quantity + action.payload.quantity <= 0) {
        state.cart = state.cart.filter((product) => product.id !== action.payload.product.id);
      } else {
        product.quantity = product.quantity + action.payload.quantity;
      }

      updateQuantities(state);
    },
    selectItem: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id);
      product.selected = !product.selected;
      updateQuantities(state);
    }
  }
});

export const {
  fetchCart,
  setCart,
  addToCart,
  removeFromCart,
  changeQuantity,
  selectItem
} = cartSlice.actions;

export default cartSlice.reducer;