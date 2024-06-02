import $api from '@app/http'
import { addComplaint } from '@shared/api/complaints/models.ts'

const BASE_URL = '/complaints'

export const addUserComplaint = (body: addComplaint) => {
   return $api.post(`${BASE_URL}/`, body)
}