import { Comment } from '@shared/api'
import { getCommentsByAnimeId } from '@shared/api/comments/comments'
import { useStore } from '@app/hooks/useStore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { handleFetchError } from '@app/helpers/functions'

export const useComments = () => {
   const { store } = useStore()
   const { id } = useParams()
   const [comments, setComments] = useState<Comment[]>()

   useEffect(() => {
      const fetchData = async () => {
         if (id) {
            try {
               const { data } = await getCommentsByAnimeId({ id })
               setComments(data)
            } catch (e) {
               handleFetchError(e)
            }
         }
      }
      fetchData()
   }, [id, store.anime.toggleUpdateComments])

   return comments
}
