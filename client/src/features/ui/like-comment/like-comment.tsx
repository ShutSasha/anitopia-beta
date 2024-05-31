import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { fetchLikes } from './helpers/fetchLikes'
import { handleLike } from './helpers/handleLike'

interface LikeCommentProps {
   id: string
}

export const LikeComment: FC<LikeCommentProps> = observer(({ id }) => {
   const { store } = useStore()
   const [likes, setLikes] = useState<number>(0)
   const [isLiked, setIsLiked] = useState<boolean>(false)

   useEffect(() => {
      fetchLikes(id, store, setLikes, setIsLiked)
   }, [id, store.anime.toggleUpdateComments])

   return (
      <span
         className={isLiked ? `${styles.like} ${styles.isLike}` : `${styles.like}`}
         onClick={() => handleLike(id, store, setLikes, setIsLiked, likes)}
      >
         {likes}
      </span>
   )
})
