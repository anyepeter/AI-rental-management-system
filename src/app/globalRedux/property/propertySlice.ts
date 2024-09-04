import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    properties: [],
    user: {},
    filterResults: [],
    aiProperties: [],
  };
  
  export const counterSlice = createSlice({
    name: "rental",
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
    },
  fetchAIProperty: (state, action) => {
        state.aiProperties = action.payload;
    }
  }})

export const { fetchAllProperty, addUser, filterProperties, fetchAIProperty } = counterSlice.actions;
export default counterSlice.reducer;