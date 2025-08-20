import { createSlice } from "@reduxjs/toolkit";
import type CartProductType from "../../shared/types/cart";

interface CartState {
  cartItems: CartProductType[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeProductFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    addQuantityToCartProduct: (state, action) => {
      const cartItem: CartProductType | undefined = state.cartItems.find(
        (item) => item.id === action.payload.productId
      );
      cartItem!.quantity += 1;
    },
    reduceQuantityFromCartProduct: (state, action) => {
      const cartItem: CartProductType | undefined = state.cartItems.find(
        (item) => item.id === action.payload.productId
      );
      if (cartItem!.quantity > 1) {
        cartItem!.quantity -= 1;
      }
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  emptyCart,
  addQuantityToCartProduct,
  reduceQuantityFromCartProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
