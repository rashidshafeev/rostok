import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  selected: [],
  itemsQuantity: 0,
  selectedQuantity: 0,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload)
      console.log(state.cart.find((item) => item.id === action.payload.id))

      const product = state.cart.find((item) => item.id === action.payload.id)

      if (product) {
        product.quantity += 1
      } else {
        console.log("!product")
        const newProduct = { ...action.payload, quantity: 1 }
        state.cart.push(newProduct)
      }

      const itemsQuantity = state.cart.reduce((accumulator, item) => { 
        accumulator += item.quantity
        return accumulator
      }, 0)
      state.itemsQuantity = itemsQuantity

      const selectedQuantity = state.cart.reduce((accumulator, item) => { 
        if (item.selected) {
          accumulator += item.quantity
        }
        return accumulator
      }, 0)
      state.selectedQuantity = selectedQuantity
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload.id);

      const itemsQuantity = state.cart.reduce((accumulator, item) => { 
        accumulator += item.quantity
        return accumulator
      }, 0)
      state.itemsQuantity = itemsQuantity

      const selectedQuantity = state.cart.reduce((accumulator, item) => { 
        if (item.selected) {
          accumulator += item.quantity
        }
        return accumulator
      }, 0)
      state.selectedQuantity = selectedQuantity
    },
    changeQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.product.id)

      if (product.quantity + action.payload.quantity <= 0) {
        state.cart = state.cart.filter((product) => product.id !== action.payload.product.id);
      } else {
        product.quantity = product.quantity + action.payload.quantity
      }

      const itemsQuantity = state.cart.reduce((accumulator, item) => { 
        accumulator += item.quantity
        return accumulator
      }, 0)
      state.itemsQuantity = itemsQuantity

      const selectedQuantity = state.cart.reduce((accumulator, item) => { 
        if (item.selected) {
          accumulator += item.quantity
        }
        return accumulator
      }, 0)
      state.selectedQuantity = selectedQuantity

      
    },
    selectItem: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.id)

      if (product.selected) {
        product.selected = false
      } else {
        product.selected = true
      }

      const selectedQuantity = state.cart.reduce((accumulator, item) => { 
        if (item.selected) {
          accumulator += item.quantity
        }
        return accumulator
      }, 0)
      state.selectedQuantity = selectedQuantity
    
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  selectItem
} = cartSlice.actions;

export default cartSlice.reducer;
