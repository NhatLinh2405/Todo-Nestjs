import axiosService from "./axiosService";

const ENDPOINT = "user";

export const userApi = {
	getProfile: () => axiosService.get(`/${ENDPOINT}/me`),
};
