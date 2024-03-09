import { FC } from 'react'
import styles from '../styles/comment.module.scss'
import { Link } from 'react-router-dom'
import { CommentControls, DislikeComment, LikeComment } from '@features'
import { Comment } from '@shared/api'
import { useUserComment } from '../hooks/useUserComment'
import { parseISO, format } from 'date-fns'

export const AnimeComment: FC<Comment> = ({ _id, anime, comment_text, timestamp, user, __v }) => {
   const userData = useUserComment(user)
   const parsedDate = parseISO(timestamp)
   const formattedDate = format(parsedDate, 'dd.MM.yyyy HH:mm:ss')

   return (
      <>
         <div className={styles.comment}>
            <Link to='/user'>
               <img className={styles.user_icon} src={userData?.avatarLink} alt='' />
            </Link>
            <div className={styles.comment_info}>
               <p className={styles.username}>{userData && userData.username}</p>
               <p className={styles.comment_date}>{formattedDate}</p>
               <p className={styles.comment_text}>{comment_text}</p>
            </div>
            <div className={styles.features}>
               <LikeComment />
               <DislikeComment />
               <CommentControls />
            </div>
         </div>
      </>
   )
}
