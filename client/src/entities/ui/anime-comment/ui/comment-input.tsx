import { FC, useContext, useRef } from 'react'
import styles from '../styles/comment-input.module.scss'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../../main'

export const CommentInput: FC = observer(() => {
   const { store } = useContext(Context)
   const contentEdittableRef = useRef<HTMLSpanElement>(null)

   const handleChange = () => {
      if (contentEdittableRef.current) {
         store.anime.setInputComment(contentEdittableRef.current.textContent)
      }
   }

   return <span ref={contentEdittableRef} contentEditable='true' className={styles.input} onInput={handleChange} />
})
