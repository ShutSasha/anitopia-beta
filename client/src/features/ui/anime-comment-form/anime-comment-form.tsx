import { FC, useContext, useRef } from 'react'
import { CommentButton, CommentInput, EditTextItem } from '../../../entities/ui/anime-comment'
import styles from './styles.module.scss'
import { useStore } from '@app/hooks/useStore'
import { useParams } from 'react-router-dom'
import { createComment } from '@shared/api/comments/comments'
import { handleFetchError, showNotice } from '@app/helpers/functions'

export const AnimeCommentForm: FC = () => {
   const { store } = useStore()
   const inputRef = useRef<HTMLSpanElement>(null)
   const { id } = useParams()

   const SendComment = async () => {
      try {
         const res = await createComment({ animeId: id, userId: store.user.id, commentText: store.anime.inputComment })

         if (res.status === 201) {
            store.anime.setInputComment('')
            store.anime.setToggleUpdateComments()
            showNotice('Коментар відправлено', 'Ура! Новий коментар', 'success')
            if (inputRef.current) {
               inputRef.current.textContent = ''
            }
         }
      } catch (error) {
         handleFetchError(error)
      }
   }

   return (
      <>
         <CommentInput inputRef={inputRef} />
         <div className={styles.comment_menu}>
            <ul className={styles.edit_text_list}>
               {/* <EditTextItem />
               <EditTextItem /> */}
            </ul>
            <CommentButton SendComment={SendComment} button_text='Надіслати' />
         </div>
      </>
   )
}
