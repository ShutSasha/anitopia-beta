import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export default class AuthService {
   static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
      // по скольку функция асинхронная, то всегда будет возвращать промис
      return $api.post<AuthResponse>('/auth/login', { username, password })
   }

   static async registration(username: string, password: string, email: string): Promise<AxiosResponse<AuthResponse>> {
      return $api.post<AuthResponse>('/auth/registration', {
         username,
         password,
         email,
      })
   }

   static async logout(): Promise<void> {
      return $api.post('/auth/logout')
   }
   static async checkUser(username: string): Promise<AxiosResponse<AuthResponse>> {
      return $api.post('/auth/checkUser', {
         username,
      })
   }
}
