import { API_URL } from "./../http/index";
import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class Store {
	user = {} as IUser;
	isAuth = false;

	constructor() {
		makeAutoObservable(this);
	}

	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: IUser) {
		this.user = user;
	}

	async login(username: string, password: string) {
		try {
			const response = await AuthService.login(username, password);
			console.log(response);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (error: any) {
			//! передивитись
			console.error(error.response.data.message);
		}
	}

	async registration(username: string, password: string, email: string) {
		try {
			const response = await AuthService.registration(
				username,
				password,
				email
			);
			console.log(response);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			//! передивитись
			console.log(error);
		}
	}

	async logout() {
		try {
			const response = await AuthService.logout();
			localStorage.removeItem("token");
			this.setAuth(false);
			this.setUser({} as IUser);
		} catch (error) {
			//! передивитись
			console.log(error);
		}
	}

	async checkAuth() {
		try {
			const response = await axios.get<AuthResponse>(
				`${API_URL}/auth/refresh`,
				{ withCredentials: true }
			);
			localStorage.setItem("token", response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.error(e);
		}
	}
}
