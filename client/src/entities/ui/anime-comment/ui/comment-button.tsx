import React, { FC } from 'react'
import styles from '../styles/comment-button.module.scss'
import { observer } from 'mobx-react-lite'

type Props = {
   SendComment: React.MouseEventHandler<HTMLButtonElement>
   button_text: string
}

export const CommentButton: FC<Props> = observer(({ SendComment, button_text }) => {
   return (
      <button onClick={SendComment} className={styles.btn}>
         {button_text}
      </button>
   )
})
