import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import admin from "./reducers/adminSlice";
import todos from "./reducers/todoSlice";
import user from "./reducers/userSlice";

export const store = configureStore({
	reducer: {
		user,
		todos,
		admin,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
