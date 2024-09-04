"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import counterReducer from "./property/propertySlice";


const rootReducer = combineReducers({
  property: counterReducer,
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });