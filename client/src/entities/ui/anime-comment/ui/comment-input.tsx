import React, { FC, useContext, useEffect } from 'react'
import styles from '../styles/comment-input.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from '@app/hooks/useStore'

type Props = {
   inputRef: React.RefObject<HTMLSpanElement>
   isEdit?: boolean
   comment_text?: string
}

export const CommentInput: FC<Props> = observer(({ inputRef, isEdit, comment_text }) => {
   const { store } = useStore()

   useEffect(() => {
      if (inputRef.current && comment_text) {
         inputRef.current.textContent = comment_text
      }
   }, [comment_text, inputRef])

   const handleChange = () => {
      if (inputRef.current) {
         if (isEdit) {
            store.anime.setEditInputComment(inputRef.current.textContent)
         }
         if (!isEdit) {
            store.anime.setInputComment(inputRef.current.textContent)
         }
      }
   }

   return <span ref={inputRef} contentEditable='true' className={styles.input} onInput={handleChange} />
})
