import { FC, useContext } from 'react'
import styles from '../styles/comment-button.module.scss'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../../main'

export const CommentButton: FC = observer(() => {
   const { store } = useContext(Context)

   const handleClick = () => {
      console.log(store.anime.inputComment)
   }

   return (
      <button onClick={handleClick} className={styles.btn}>
         Отправить
      </button>
   )
})
