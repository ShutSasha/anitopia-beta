import $api from '@app/http'
import { GetUserById, UserByIdResponse } from './models'
import { AxiosResponse } from 'axios'

const BASE_URL = '/users'

export const getUserById = ({ id }: GetUserById): Promise<AxiosResponse<UserByIdResponse>> => {
   return $api.get(`${BASE_URL}/${id}`)
}
