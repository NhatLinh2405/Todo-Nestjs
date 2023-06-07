import axiosService from "./axiosService";

const ENDPOINT = "todos";

export const todoApi = {
	getTodoComplete: () => axiosService.get(`/${ENDPOINT}/completed`),

	getTodoIncomplete: () => axiosService.get(`/${ENDPOINT}/not-completed`),

	// get all todos by admin
	getAllTodo: () => axiosService.get(`/${ENDPOINT}`),

	addTodo: (title: string) =>
		axiosService.post(`/${ENDPOINT}`, {
			title,
		}),

	updateComplete: (id: string) =>
		axiosService.patch(`/${ENDPOINT}`, {
			id,
		}),

	deleteTodo: (id: string) =>
		axiosService.delete(`/${ENDPOINT}`, {
			data: {
				id,
			},
		}),
};
