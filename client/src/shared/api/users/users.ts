import $api from '@app/http'
import { EditUserPersonalInfo, GetUserById, UserByIdResponse } from './models'
import { AxiosResponse } from 'axios'

const BASE_URL = '/users'

export const getUserById = ({ id }: GetUserById): Promise<AxiosResponse<UserByIdResponse>> => {
   return $api.get(`${BASE_URL}/${id}`)
}

export const editUserPersonalInfo = ({ id, ...body }: EditUserPersonalInfo): Promise<AxiosResponse<any>> => {
   return $api.put(`${BASE_URL}/${id}/personal-data`, body)
}
