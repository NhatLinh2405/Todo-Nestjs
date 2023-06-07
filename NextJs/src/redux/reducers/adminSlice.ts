import { createSlice } from "@reduxjs/toolkit";
import { deleteUserByAdmin, getAllUserByAdmin } from "../actions/adminAction";
import { RootState } from "../store";
import { IUser } from "./userSlice";

interface IAdminState {
	users: IUser[];
}

const initialState: IAdminState = {
	users: [],
};

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllUserByAdmin.fulfilled, (state, { payload }) => {
			const { users } = payload;
			if (state.users) {
				state.users = users;
			}
		});

		builder.addCase(deleteUserByAdmin.fulfilled, (state, { payload }) => {
			if (state.users) {
				state.users = state.users.filter((user) => user.id !== payload);
			}
		});
	},
});

export const {} = adminSlice.actions;
export const selectAdmin = (state: RootState) => state.admin;

export default adminSlice.reducer;
