import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../slices/order";
import cartReducer from "../slices/cart";
import searchReducer from "../slices/search";
import authReducer from "../slices/auth";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    cart: cartReducer,
    search: searchReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
