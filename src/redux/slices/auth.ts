import { createSlice } from "@reduxjs/toolkit";
import type { UserData } from "../../shared/types/user";

interface AuthState {
  loggedInUser: UserData | null;
}

const initialState: AuthState = {
  loggedInUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeLoggedInUserDetails: (state, action) => {
      state.loggedInUser = action.payload;
    },
    removeLoggedInUserDetails: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const { storeLoggedInUserDetails, removeLoggedInUserDetails } =
  authSlice.actions;
export default authSlice.reducer;
