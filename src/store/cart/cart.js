import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  shippingAddress: null,
};

export const cartbasketSlice = createSlice({
  name: 'cart-basket',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.cartItems.find((item) => item._id === product._id);

      if (exist) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === product._id ? { ...product, qty: item.qty + 1 } : item
        );
      } else {
        state.cartItems = [...state.cartItems, { ...product, qty: 1 }];
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const exist = state.cartItems.find((item) => item._id === product._id);

      if (exist.qty === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== product._id
        );
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item._id === product._id ? { ...product, qty: item.qty - 1 } : item
        );
      }
    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    reset: (state) => {
      state.cartItems = [];
      state.shippingAddress = null;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  resetCart,
  saveShippingAddress,
  reset,
} = cartbasketSlice.actions;

export default cartbasketSlice;
