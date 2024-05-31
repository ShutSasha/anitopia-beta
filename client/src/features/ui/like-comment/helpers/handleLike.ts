import { Dispatch, SetStateAction } from 'react'
import Store from '@app/store/store'
import { likeComment } from '@shared/api/comments/comments'
import { handleFetchError, showNotice } from '@app/helpers/functions'

export const handleLike = async (
   id: string,
   store: Store,
   setLikes: Dispatch<SetStateAction<number>>,
   setIsLiked: Dispatch<SetStateAction<boolean>>,
   likes: number,
) => {
   try {
      const { data } = await likeComment({
         commentId: id,
         userId: store.user.id,
      })
      setLikes(data.likes)
      store.anime.setToggleUpdateComments()
      if (likes < data.likes) {
         setIsLiked(true)
         return showNotice('Ваш лайк додано', 'Лайк', 'success')
      }
      if (likes > data.likes) {
         setIsLiked(false)
         return showNotice('Ваш лайк видалено', 'Лайк', 'normal')
      }
   } catch (e) {
      handleFetchError(e)
   }
}
