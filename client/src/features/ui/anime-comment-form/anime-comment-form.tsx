import { FC } from 'react'
import {
   CommentButton,
   CommentInput,
   EditTextItem,
} from '../../../entities/ui/anime-comment'
import styles from './styles.module.scss'

export const AnimeCommentForm: FC = () => {
   return (
      <>
         <CommentInput />
         <div className={styles.comment_menu}>
            <ul className={styles.edit_text_list}>
               <EditTextItem />
               <EditTextItem />
            </ul>
            <CommentButton />
         </div>
      </>
   )
}
