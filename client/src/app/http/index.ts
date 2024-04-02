import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const API_URL =
   process.env.NODE_ENV === 'production'
      ? 'https://anitopia-272e22b911e8.herokuapp.com/api'
      : 'http://localhost:5000/api'

// Тут мы создаем instance axios
const $api = axios.create({
   withCredentials: true, // для того что бы каждому запросу - куки цеплялись автоматичкски
   baseURL: API_URL,
})

// интерсептор для запроса
$api.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem(`token`)}`
   return config
})

$api.interceptors.response.use(
   (config) => {
      return config
   },
   async (error) => {
      const originalRequest = error.config
      if (error.response.status == 401 && error.config && !error.config._isRetry) {
         originalRequest._isRetry = true
         try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
         } catch (error) {
            console.error('Не авторизирован')
         }
      }
      throw error
   },
)

export default $api
