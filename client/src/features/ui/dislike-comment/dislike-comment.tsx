import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useStore } from '@app/hooks/useStore'
import { dislikeComment, getDislikes } from '@shared/api/comments/comments'
import { handleFetchError, showNotice } from '@app/helpers/functions'

interface DislikeCommentProps {
   id: string
}

export const DislikeComment: FC<DislikeCommentProps> = ({ id }) => {
   const { store } = useStore()
   const [dislikes, setDislikes] = useState<number>(0)

   useEffect(() => {
      const fetchDislikes = async () => {
         try {
            const { data } = await getDislikes({ id: id })
            setDislikes(data.dislikes)
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchDislikes()
   }, [id, store.anime.toggleUpdateComments])

   const handleDislike = async () => {
      try {
         const { data } = await dislikeComment({ commentId: id, userId: store.user.id })
         setDislikes(data.dislikes)
         store.anime.setToggleUpdateComments()
         if (dislikes < data.dislikes) return showNotice('Ваш дізлайк додано', 'Дізлайк', 'success')
         if (dislikes > data.dislikes) return showNotice('Ваш дізлайк видалено', 'Дізлайк', 'normal')
      } catch (e) {
         handleFetchError(e)
      }
   }

   return (
      <span className={styles.dislike} onClick={handleDislike}>
         {dislikes}
      </span>
   )
}
