import React, { FC, useContext } from 'react'
import styles from '../styles/comment-input.module.scss'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../../main'

type Props = {
   inputRef: React.RefObject<HTMLSpanElement>
}

export const CommentInput: FC<Props> = observer(({ inputRef }) => {
   const { store } = useContext(Context)

   const handleChange = () => {
      if (inputRef.current) {
         store.anime.setInputComment(inputRef.current.textContent)
      }
   }

   return <span ref={inputRef} contentEditable='true' className={styles.input} onInput={handleChange} />
})
