import { handleFetchError, showNotice } from '@app/helpers/functions'
import Store from '@app/store/store'
import { dislikeComment } from '@shared/api/comments/comments'
import { Dispatch, SetStateAction } from 'react'

export const handleDislike = async (
   id: string,
   store: Store,
   setDislikes: Dispatch<SetStateAction<number>>,
   setIsDisliked: Dispatch<SetStateAction<boolean>>,
   dislikes: number,
) => {
   try {
      const { data } = await dislikeComment({ commentId: id, userId: store.user.id })
      setDislikes(data.dislikes)
      store.anime.setToggleUpdateComments()

      if (dislikes < data.dislikes) {
         setIsDisliked(true)
         return showNotice('Ваш дізлайк додано', 'Дізлайк', 'success')
      }
      if (dislikes > data.dislikes) {
         setIsDisliked(false)
         return showNotice('Ваш дізлайк видалено', 'Дізлайк', 'normal')
      }
   } catch (e) {
      handleFetchError(e)
   }
}
