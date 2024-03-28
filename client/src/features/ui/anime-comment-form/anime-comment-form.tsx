import { FC, useContext, useRef } from 'react'
import { CommentButton, CommentInput, EditTextItem } from '../../../entities/ui/anime-comment'
import styles from './styles.module.scss'
import { Context } from '../../../main'
import { useParams } from 'react-router-dom'
import { createComment } from '@shared/api/comments/comments'

export const AnimeCommentForm: FC = () => {
   const { store } = useContext(Context)
   const inputRef = useRef<HTMLSpanElement>(null)
   const { id } = useParams()

   const SendComment = async () => {
      try {
         const res = await createComment({ animeId: id, userId: store.user.id, commentText: store.anime.inputComment })

         console.log(res)

         if (res.status === 201) {
            store.anime.setInputComment('')
            store.anime.setToggleUpdateComments()
            if (inputRef.current) {
               inputRef.current.textContent = ''
            }
         }
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <>
         <CommentInput inputRef={inputRef} />
         <div className={styles.comment_menu}>
            <ul className={styles.edit_text_list}>
               <EditTextItem />
               <EditTextItem />
            </ul>
            <CommentButton SendComment={SendComment} button_text='Надіслати' />
         </div>
      </>
   )
}
