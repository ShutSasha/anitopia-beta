import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { getLikes, likeComment } from '@shared/api/comments/comments'
import { handleFetchError, showNotice } from '@app/helpers/functions'
import { useStore } from '@app/hooks/useStore'

interface LikeCommentProps {
   id: string
}

export const LikeComment: FC<LikeCommentProps> = ({ id }) => {
   const { store } = useStore()
   const [likes, setLikes] = useState<number>(0)

   useEffect(() => {
      const fetchLikes = async () => {
         try {
            const { data } = await getLikes({ id: id })
            setLikes(data.likes)
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchLikes()
   }, [id, store.anime.toggleUpdateComments])

   const handleLike = async () => {
      try {
         const { data } = await likeComment({ commentId: id, userId: store.user.id })
         setLikes(data.likes)
         store.anime.setToggleUpdateComments()
         if (likes < data.likes) return showNotice('Ваш лайк додано', 'Лайк', 'success')
         if (likes > data.likes) return showNotice('Ваш лайк видалено', 'Лайк', 'normal')
      } catch (e) {
         handleFetchError(e)
      }
   }

   return (
      <span className={styles.like} onClick={handleLike}>
         {likes}
      </span>
   )
}
