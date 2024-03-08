import $api from '../../../app/http'
import { CreateComment, GetCommentsByAnimeId, GetUserComment, UserComment } from './models'

const BASE_URL = '/comments'

export const getCommentsByAnimeId = ({ id }: GetCommentsByAnimeId) => {
   return $api.get(`${BASE_URL}/${id}`)
}

export const createComment = ({ ...body }: CreateComment) => {
   return $api.post(`${BASE_URL}`, body)
}

export const getUserComment = ({ id }: GetUserComment) => {
   return $api.get(`/users/${id}`)
}
