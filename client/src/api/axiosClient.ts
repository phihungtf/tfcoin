import axios, { InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
	baseURL: `http://localhost:4000`,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
	async (
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig<any>> => {
		return {
			...config,
			// Removed the headers override to comply with AxiosRequestHeaders type
		};
	}
);

export default axiosClient;
