import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    properties: [],
    user: {},
    filterResults: [],
  };
  
  export const counterSlice = createSlice({
    name: "tourism",
    initialState,
    reducers: {
      fetchAllProperty: (state, action) => {
        state.properties = action.payload;
      },
      addUser: (state, action) => {
        state.user = action.payload;
      },
      filterProperties: (state, action) => {
        state.filterResults = action.payload;
    }}
  })

export const { fetchAllProperty, addUser, filterProperties } = counterSlice.actions;
export default counterSlice.reducer;