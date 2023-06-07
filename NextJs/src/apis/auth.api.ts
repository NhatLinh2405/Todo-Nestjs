import axiosService from "./axiosService";

const ENDPOINT = "auth";

export const authApi = {
	signUp: (data: { email: string; password: string }) => {
		return axiosService.post(`/${ENDPOINT}/sign-up`, data);
	},
	signIn: (data: { email: string; password: string }) => {
		return axiosService.post(`/${ENDPOINT}/sign-in`, data);
	},
};
