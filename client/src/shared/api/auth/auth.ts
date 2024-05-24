import $api from '@app/http'
//import { ResetPasswordResponse } from './models.ts'
import { AxiosResponse } from 'axios'

const BASE_URL = '/auth'

export const resetPassword = ({ email }: { email: string }): Promise<AxiosResponse<any>> => {
   return $api.put(`${BASE_URL}/rechange`, { email: email })
}
