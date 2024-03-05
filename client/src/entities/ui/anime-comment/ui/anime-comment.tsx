import { FC } from 'react'
import styles from '../styles/comment.module.scss'
import { Link } from 'react-router-dom'
import { DislikeComment, LikeComment } from '@features'

export const AnimeComment: FC = () => {
   return (
      <>
         <div className={styles.comment}>
            <Link to='/user'>
               <img className={styles.user_icon} src='' alt='' />
            </Link>
            <div className={styles.comment_info}>
               <p className={styles.username}>username</p>
               <p className={styles.comment_date}>05 March 03:11</p>
               <p className={styles.comment_text}>It was so incredible anime episode, I recommended to all watch it!</p>
            </div>
            <div className={styles.features}>
               <LikeComment />
               <DislikeComment />
            </div>
         </div>
      </>
   )
}
