import $api from '@app/http'
import { EditUserPersonalInfo, GetUserById, UserByIdResponse, ChangePasswordResponse } from './models'
import { AxiosResponse } from 'axios'

const BASE_URL = '/users'

export const getUsers = (isControlPanel: boolean): Promise<AxiosResponse<UserByIdResponse[]>> => {
   return $api.get(BASE_URL, { params: { isControlPanel } })
}

export const getUserById = ({ id }: GetUserById): Promise<AxiosResponse<UserByIdResponse>> => {
   return $api.get(`${BASE_URL}/${id}`)
}

export const editUserPersonalInfo = ({ id, ...body }: EditUserPersonalInfo): Promise<AxiosResponse<any>> => {
   return $api.put(`${BASE_URL}/${id}/personal-data`, body)
}

export const changePassword = ({
   id,
   ...body
}: ChangePasswordResponse): Promise<AxiosResponse<ChangePasswordResponse>> => {
   return $api.put(`${BASE_URL}/${id}/password`, body)
}
