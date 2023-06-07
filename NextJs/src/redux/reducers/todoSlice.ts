import { createSlice } from "@reduxjs/toolkit";
import {
	addTodo,
	deleteTodo,
	getTodoComplete,
	getTodoIncomplete,
	updateComplete,
} from "../actions/todoAction";
import { RootState } from "../store";

export interface ITodos {
	id: string;
	title: string;
	complete: boolean;
	createdAt: string;
	updatedAt: string;
}

interface ITodoState {
	completed: ITodos[];
	incompleted: ITodos[];
}

const initialState: ITodoState = {
	completed: [],
	incompleted: [],
};

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTodoComplete.fulfilled, (state, { payload }) => {
			const { todos } = payload;
			if (state.completed) {
				state.completed = todos;
			}
		});
		builder.addCase(getTodoIncomplete.fulfilled, (state, { payload }) => {
			const { todos } = payload;
			if (state.incompleted) {
				state.incompleted = todos;
			}
		});
		builder.addCase(updateComplete.fulfilled, (state, { payload }) => {
			const { data } = payload;
			if (state.incompleted) {
				state.incompleted = state.incompleted.filter((todo) => todo.id !== data.id);
			}
			if (state.completed) {
				state.completed.push(data);
			}
		});
		builder.addCase(deleteTodo.fulfilled, (state, { payload }) => {
			if (state.incompleted) {
				state.incompleted = state.incompleted.filter((todo) => todo.id !== payload);
			}
		});
		builder.addCase(addTodo.fulfilled, (state, { payload }) => {
			const { todos } = payload;
			if (state.incompleted) {
				state.incompleted.push(todos);
			}
		});
	},
});

export const {} = todosSlice.actions;
export const selectTodos = (state: RootState) => state.todos;

export default todosSlice.reducer;
