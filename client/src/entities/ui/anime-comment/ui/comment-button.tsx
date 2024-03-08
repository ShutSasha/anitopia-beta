import React, { FC } from 'react'
import styles from '../styles/comment-button.module.scss'
import { observer } from 'mobx-react-lite'

type Props = {
   SendComment: React.MouseEventHandler<HTMLButtonElement>
}

export const CommentButton: FC<Props> = observer(({ SendComment }) => {
   return (
      <button onClick={SendComment} className={styles.btn}>
         Отправить
      </button>
   )
})
