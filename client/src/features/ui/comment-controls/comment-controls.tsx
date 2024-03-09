import { FC, useContext, useState } from 'react'
import styles from './styles.module.scss'
import { deleteComment } from '@shared/api/comments/comments'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'

type Props = {
   commentId: string
   animeId: string
   user_id: string
}

export const CommentControls: FC<Props> = observer(({ commentId, animeId, user_id }) => {
   const { store } = useContext(Context)
   const [isActive, setActive] = useState<boolean>(false)

   const handleDeleteCommentClick = async () => {
      try {
         const res = await deleteComment({ commentId, animeId })

         if (res.status === 200) {
            store.anime.setToggleUpdateComments()
         }
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <>
         <div onClick={() => setActive(!isActive)} className={`${isActive ? styles.wrapper : styles.wrapper_}`} />
         <span onClick={() => setActive(!isActive)} className={styles.drop_menu_click} />
         <div
            onClick={(e) => e.stopPropagation()}
            className={`${isActive ? styles.hidden_menu : `${styles.hidden_menu} ${styles.invisible}`}`}
            id='drop-down-menu-comment'
         >
            <div className={styles.drop_lits}>
               {store.user.id == user_id ? (
                  <>
                     <div className={styles.drop_menu_item}>Редагувати</div>
                     <div className={styles.drop_menu_item} onClick={handleDeleteCommentClick}>
                        Видалити
                     </div>
                  </>
               ) : (
                  <div className={styles.drop_menu_item}>Поскаржитись</div>
               )}
            </div>
         </div>
      </>
   )
})
