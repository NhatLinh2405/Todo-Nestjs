import axiosService from "./axiosService";

const ENDPOINT = "user";

export const adminApi = {
	getAllUserByAdmin: () => axiosService.get(`/${ENDPOINT}`),

	deleteUserByAdmin: (id: string) =>
		axiosService.delete(`/${ENDPOINT}`, {
			data: {
				id,
			},
		}),
};
