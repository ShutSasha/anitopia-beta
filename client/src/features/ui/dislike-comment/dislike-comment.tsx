import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useStore } from '@app/hooks/useStore'
import { fetchDislikes } from './helpers/fetchDislikes'
import { observer } from 'mobx-react-lite'
import { handleDislike } from './helpers/handleDislike'

interface DislikeCommentProps {
   id: string
}

export const DislikeComment: FC<DislikeCommentProps> = observer(({ id }) => {
   const { store } = useStore()
   const [dislikes, setDislikes] = useState<number>(0)
   const [isDisliked, setIsDisliked] = useState<boolean>(false)

   useEffect(() => {
      fetchDislikes(id, setDislikes, setIsDisliked, store)
   }, [id, store.anime.toggleUpdateComments])

   return (
      <span
         className={isDisliked ? `${styles.dislike} ${styles.isDislike}` : `${styles.dislike}`}
         onClick={() => handleDislike(id, store, setDislikes, setIsDisliked, dislikes)}
      >
         {dislikes}
      </span>
   )
})
