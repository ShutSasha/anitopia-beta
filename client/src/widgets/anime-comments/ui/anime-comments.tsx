import { FC } from 'react'
import { AnimeHeaderComments, AnimeCommentForm } from '@features'

export const AnimeComments: FC = () => {
   return (
      <>
         <AnimeHeaderComments />
         <AnimeCommentForm />
      </>
   )
}
