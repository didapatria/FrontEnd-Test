import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import dataListReducers from "@/redux/slices/dataListSlice";
import UIReducers from "@/redux/slices/UISlice";

export const store = configureStore({
  reducer: {
    dataListReducers,
    UIReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;