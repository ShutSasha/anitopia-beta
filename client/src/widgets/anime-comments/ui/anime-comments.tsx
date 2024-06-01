import { FC } from 'react'
import { AnimeHeaderComments, AnimeCommentForm } from '@features'
import { AnimeComment } from '@entities/index'
import styles from './styles.module.scss'
import { useComments } from '../hooks/useComments'
import { observer } from 'mobx-react-lite'
import { Comment } from '@shared/api'

export const AnimeComments: FC = observer(() => {
   const comments = useComments()

   return (
      <>
         <div className={styles.write_comment}>
            <AnimeHeaderComments />
            <AnimeCommentForm />
         </div>
         {comments && comments.map((item: Comment) => <AnimeComment key={item._id} {...item} />)}
      </>
   )
})
