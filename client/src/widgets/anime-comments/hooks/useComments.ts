import { Comment } from '@shared/api'
import { getCommentsByAnimeId } from '@shared/api/comments/comments'
import { Context } from '../../../main'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const useComments = () => {
   const { store } = useContext(Context)
   const { id } = useParams()
   const [comments, setComments] = useState<Comment[]>()

   useEffect(() => {
      const fetchData = async () => {
         if (id) {
            try {
               const res = await getCommentsByAnimeId({ id })
               setComments(res.data)
            } catch (error) {
               console.error('Error fetching comments:', error)
            }
         }
      }
      fetchData()
   }, [id, store.anime.toggleUpdateComments])

   return comments
}
