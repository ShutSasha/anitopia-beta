import { FC, useState } from 'react'
import styles from '../styles/comment-input.module.scss'

export const CommentInput: FC = () => {
   const [text, setText] = useState<string>('')

   const handleChange = (event: any) => {
      setText(event.target.value)
   }

   return (
      <span
         contentEditable='true'
         className={styles.input}
         onChange={handleChange}
      >
         {text}
      </span>
   )
}
