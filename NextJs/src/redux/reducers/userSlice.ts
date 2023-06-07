import { createSlice } from "@reduxjs/toolkit";
import { getProfile, signIn, signUp } from "../actions/userAction";
import { RootState } from "../store";

export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	createdAt: string;
	updatedAt: string;
}

const initialState: IUser = {
	id: "",
	email: "",
	firstName: "",
	lastName: "",
	role: "",
	createdAt: "",
	updatedAt: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetUser: () => {
			localStorage.removeItem("token");
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signIn.fulfilled, (state, { payload }) => {
			const { token } = payload;
			localStorage.setItem("token", token);
		});
		// signUp
		builder.addCase(signUp.fulfilled, (state, { payload }) => {
			const { token } = payload;
			localStorage.setItem("token", token);
		});
		builder.addCase(getProfile.fulfilled, (state, { payload }) => {
			const { user } = payload;
			state.email = user.email;
			state.firstName = user.firstName;
			state.lastName = user.lastName;
			state.role = user.role;
		});
	},
});

export const { resetUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
