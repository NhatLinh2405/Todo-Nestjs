import { todoApi } from "@/apis/todo.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTodoComplete = createAsyncThunk("todos/getTodoComplete", async (_data, thunkApi) => {
	try {
		const res = await todoApi.getTodoComplete();
		return res.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const getTodoIncomplete = createAsyncThunk("todos/getTodoIncomplete", async (_data, thunkApi) => {
	try {
		const res = await todoApi.getTodoIncomplete();
		return res.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const updateComplete = createAsyncThunk("todos/updateComplete", async (id: string, thunkApi) => {
	try {
		const res = await todoApi.updateComplete(id);
		return res.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id: string, thunkApi) => {
	try {
		await todoApi.deleteTodo(id);
		return id;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const addTodo = createAsyncThunk("todos/addTodo", async (title: string, thunkApi) => {
	try {
		const res = await todoApi.addTodo(title);
		return res.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});
