import { FC, useEffect } from 'react'
import { AnimeHeaderComments, AnimeCommentForm } from '@features'
import { AnimeComment } from '@entities/index'
import styles from './styles.module.scss'

export const AnimeComments: FC = () => {
   useEffect(() => {
      // fetch comments data
   }, [])

   return (
      <>
         <div className={styles.write_comment}>
            <AnimeHeaderComments />
            <AnimeCommentForm />
         </div>
         <AnimeComment />
         <AnimeComment />
         <AnimeComment />
         <AnimeComment />
      </>
   )
}
