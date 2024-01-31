import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Тут мы создаем instance axios
const $api = axios.create({
	withCredentials: true, // для того что бы каждому запросу - куки цеплялись автоматичкски
	baseURL: API_URL,
});

// интерсептор для запроса
$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(`token`)}`;
	return config;
});

export default $api;
