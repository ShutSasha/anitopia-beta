import $api from '@app/http'
import { addBanBody } from './models'

const BASE_URL = '/bans'

export const addBan = (body: addBanBody) => {
   return $api.post(`${BASE_URL}/${body.id}`, body)
}

export const removeBan = (id: string) => {
   return $api.delete(`${BASE_URL}/${id}`)
}