import { FC, useState } from 'react'
import styles from './styles.module.scss'

export const CommentControls: FC = () => {
   const [isActive, setActive] = useState<boolean>(false)
   console.log(isActive)

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
               <div className={styles.drop_menu_item}>Редагувати</div>
               <div className={styles.drop_menu_item}>Видалити</div>
            </div>
         </div>
      </>
   )
}
