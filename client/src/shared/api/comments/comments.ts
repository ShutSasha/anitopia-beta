import $api from '@app/http'
import {
   CreateComment,
   DeleteComment,
   EditComment,
   GetCommentById,
   GetCommentsByAnimeId,
   GetUserComment,
} from './models'
import { AxiosResponse } from 'axios'

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

export const getLikes = ({ id }: { id: string }): Promise<AxiosResponse<{ likes: number }>> => {
   return $api.get(`${BASE_URL}/like/${id}`)
}

export const getDislikes = ({ id }: { id: string }): Promise<AxiosResponse<{ dislikes: number }>> => {
   return $api.get(`${BASE_URL}/dislike/${id}`)
}

export const likeComment = ({
   ...body
}: {
   commentId: string
   userId: string
}): Promise<AxiosResponse<{ likes: number }>> => {
   return $api.patch(`${BASE_URL}/like`, body)
}

export const dislikeComment = ({
   ...body
}: {
   commentId: string
   userId: string
}): Promise<AxiosResponse<{ dislikes: number }>> => {
   return $api.patch(`${BASE_URL}/dislike`, body)
}