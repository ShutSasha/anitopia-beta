import { FC, useContext, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { deleteComment } from '@shared/api/comments/comments'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'

type Props = {
   commentId: string
   animeId: string
   user_id: string
   setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const CommentControls: FC<Props> = observer(({ commentId, animeId, user_id, setEdit }) => {
   const { store } = useContext(Context)
   const [isActive, setActive] = useState<boolean>(false)
   const optionsRef = useRef<HTMLDivElement>(null)

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

   const handleEditCommentClick = async () => {
      setEdit(true)
   }

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
            setActive(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <div ref={optionsRef} onClick={() => setActive(!isActive)} className={styles.options_wrapper}>
         <span className={styles.drop_menu_click} />
         <div
            className={`${isActive ? styles.hidden_menu : `${styles.hidden_menu} ${styles.invisible}`}`}
            id='drop-down-menu-comment'
         >
            <div className={styles.drop_lits}>
               {store.user.id == user_id ? (
                  <>
                     <div className={styles.drop_menu_item} onClick={handleEditCommentClick}>
                        Редагувати
                     </div>
                     <div className={styles.drop_menu_item} onClick={handleDeleteCommentClick}>
                        Видалити
                     </div>
                  </>
               ) : (
                  <div className={styles.drop_menu_item}>Поскаржитись</div>
               )}
            </div>
         </div>
      </div>
   )
})
