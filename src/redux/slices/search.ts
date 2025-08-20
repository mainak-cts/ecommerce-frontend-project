import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchInput: "",
  },
  reducers: {
    changeSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
});

export const { changeSearchInput } = searchSlice.actions;
export default searchSlice.reducer;
