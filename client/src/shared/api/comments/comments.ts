import $api from '@app/http'
import {
   CreateComment,
   DeleteComment,
   EditComment,
   GetCommentById,
   GetCommentsByAnimeId,
   GetUserComment,
} from './models'

const BASE_URL = '/comments'

export const getCommentByid = ({ id }: GetCommentById) => {
   return $api.get(`${BASE_URL}/${id}`)
}

export const getUserComment = ({ id }: GetUserComment) => {
   return $api.get(`/users/${id}`)
}

export const getCommentsByAnimeId = ({ id }: GetCommentsByAnimeId) => {
   return $api.get(`${BASE_URL}/anime/${id}`)
}

export const createComment = ({ ...body }: CreateComment) => {
   return $api.post(BASE_URL, body)
}

export const editComment = ({ ...body }: EditComment) => {
   return $api.patch(BASE_URL, body)
}

export const deleteComment = ({ ...body }: DeleteComment) => {
   return $api.delete(`${BASE_URL}?commentId=${body.commentId}&animeId=${body.animeId}`)
}
