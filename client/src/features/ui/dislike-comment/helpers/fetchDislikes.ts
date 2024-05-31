import { handleFetchError } from '@app/helpers/functions'
import Store from '@app/store/store'
import { getCommentByid, getDislikes } from '@shared/api/comments/comments'
import { Dispatch, SetStateAction } from 'react'

export const fetchDislikes = async (
   id: string,
   setDislikes: Dispatch<SetStateAction<number>>,
   setIsDisliked: Dispatch<SetStateAction<boolean>>,
   store: Store,
) => {
   try {
      const { data } = await getDislikes({ id: id })
      setDislikes(data.dislikes)

      const res = await getCommentByid({ id: id })
      const isDislikedByUser = res.data.dislikesBy.find((item: string) => item === store.user.id)
      if (isDislikedByUser) setIsDisliked(true)
      if (!isDislikedByUser) setIsDisliked(false)
   } catch (e) {
      handleFetchError(e)
   }
}
