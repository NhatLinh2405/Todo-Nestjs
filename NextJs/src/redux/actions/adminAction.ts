import { adminApi } from "@/apis/admin.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUserByAdmin = createAsyncThunk("user/getAllUserByAdmin", async (_data, thunkApi) => {
	try {
		const res = await adminApi.getAllUserByAdmin();
		return res.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const deleteUserByAdmin = createAsyncThunk("user/deleteUserByAdmin", async (id: string, thunkApi) => {
	try {
		await adminApi.deleteUserByAdmin(id);
		return id;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});
