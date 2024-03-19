import { FC, useContext, useRef, useState } from 'react'
import styles from '../styles/comment.module.scss'
import { Link } from 'react-router-dom'
import { CommentControls, DislikeComment, LikeComment } from '@features'
import { Comment } from '@shared/api'
import { useUserComment } from '../hooks/useUserComment'
import { parseISO, format } from 'date-fns'
import { CommentButton, CommentInput } from '..'
import { editComment } from '@shared/api/comments/comments'
import { Context } from '../../../../main'
import { observer } from 'mobx-react-lite'

export const AnimeComment: FC<Comment> = observer(({ _id, anime, comment_text, timestamp, user }) => {
   const { store } = useContext(Context)
   const userData = useUserComment(user)
   const parsedDate = parseISO(timestamp)
   const formattedDate = format(parsedDate, 'dd.MM.yyyy HH:mm:ss')
   const [isEdit, setEdit] = useState<boolean>(false)
   const inputRef = useRef<HTMLSpanElement>(null)

   const cancelEditComment = () => {
      setEdit(false)
   }

   const sendEditComment = async () => {
      try {
         await editComment({ comment_id: _id, new_comment_text: store.anime.editInputComment })
         setEdit(false)
         store.anime.setToggleUpdateComments()
      } catch (error) {
         console.error(error)
      }
   }

   if (isEdit) {
      return (
         <>
            <div className={styles.edit_comment}>
               <div className={styles.edit_comment_info}>
                  <img className={styles.user_icon} src={userData?.avatarLink} alt='' />
                  <div className={styles.comment_info}>
                     <p className={styles.username}>{userData && userData.username}</p>
                     <p className={styles.comment_date}>{formattedDate}</p>
                  </div>
               </div>
               <CommentInput inputRef={inputRef} isEdit={isEdit} comment_text={comment_text} />
               <div className={styles.btn_edit_comment}>
                  <CommentButton SendComment={sendEditComment} button_text='Змінити' />
                  <button className={styles.btn_cancel_edit} onClick={cancelEditComment}>
                     Відмінити
                  </button>
               </div>
            </div>
         </>
      )
   }

   return (
      <>
         <div className={styles.comment}>
            <Link to={`/profile/${user}`}>
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
               <CommentControls commentId={_id} animeId={anime} user_id={user} setEdit={setEdit} />
            </div>
         </div>
      </>
   )
})
