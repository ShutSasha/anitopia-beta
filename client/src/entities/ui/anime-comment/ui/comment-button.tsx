import { FC } from 'react'
import styles from '../styles/comment-button.module.scss'

export const CommentButton: FC = () => {
   return <button className={styles.btn}>Отправить</button>
}
