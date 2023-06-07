import { authApi } from "@/apis/auth.api";
import { userApi } from "@/apis/user.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// handle sign in
export const signIn = createAsyncThunk(
	"user/signIn",
	async (data: { email: string; password: string }, thunkApi) => {
		try {
			const user = await authApi.signIn(data);
			toast.success("Sign in successfully!");
			return user.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

// handle sign up
export const signUp = createAsyncThunk(
	"user/signUp",
	async (data: { firstName: string; lastName: string; email: string; password: string }, thunkApi) => {
		try {
			const user = await authApi.signUp(data);
			toast.success("Sign up successfully!");
			return user.data;
		} catch (error: any) {
			toast.error(error.error);
			return thunkApi.rejectWithValue(error);
		}
	}
);

// handle get profile
export const getProfile = createAsyncThunk("user/getProfile", async (_data, thunkApi) => {
	try {
		const user = await userApi.getProfile();
		return user.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});
