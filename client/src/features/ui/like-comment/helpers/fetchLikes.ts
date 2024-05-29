import { handleFetchError } from '@app/helpers/functions'
import Store from '@app/store/store'
import { getCommentByid, getLikes } from '@shared/api/comments/comments'
import { Dispatch, SetStateAction } from 'react'

export const fetchLikes = async (
   id: string,
   store: Store,
   setLikes: Dispatch<SetStateAction<number>>,
   setIsLiked: Dispatch<SetStateAction<boolean>>,
) => {
   try {
      const { data } = await getLikes({ id: id })
      setLikes(data.likes)

      const res = await getCommentByid({ id: id })

      const isLikedByUser = res.data.likesBy.find((item: string) => item === store.user.id)
      if (isLikedByUser) setIsLiked(true)
      if (!isLikedByUser) setIsLiked(false)
   } catch (e) {
      handleFetchError(e)
   }
}
