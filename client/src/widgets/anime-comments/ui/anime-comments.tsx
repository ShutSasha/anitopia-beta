import { FC } from 'react'
import { AnimeCommentForm, AnimeHeaderComments } from '../../../features'

export const AnimeComments: FC = () => {
   return (
      <>
         <AnimeHeaderComments />
         <AnimeCommentForm />
      </>
   )
}
