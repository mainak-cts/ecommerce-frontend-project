import { createSlice } from "@reduxjs/toolkit";
import type OrderProductType from "../../shared/types/order";

interface OrderState {
  orderItems: OrderProductType[];
}

const initialState: OrderState = {
  orderItems: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orderItems = [...state.orderItems, action.payload];
    },
    addOrdersFromCart: (state, action) => {
      state.orderItems = [...state.orderItems, ...action.payload];
    },
    cancelOrder: (state, action) => {
      state.orderItems = state.orderItems.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const { addOrder, addOrdersFromCart, cancelOrder } = orderSlice.actions;
export default orderSlice.reducer;
