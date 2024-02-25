import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Collection } from '../../../features/ui/anime-collection-inner/anime-collection-inner'
import styles from './styles.module.scss'

export const AnimeCollectionCard: FC<Collection> = ({
   rating,
   animeId,
   poster_url,
   title,
}) => {
   return (
      <>
         <Link
            to={
               location.pathname.replace(window.location.pathname, '/anime/') +
               animeId
            }
         >
            <div className={styles.card}>
               <div className={styles.card_poster_title}>
                  <img className={styles.poster} src={poster_url} alt='' />
                  <div className={styles.title}>{title}</div>
               </div>
               <div className={styles.ratings}>
                  {rating && (
                     <div className={styles.user_rating}>
                        Оценено на {rating}
                     </div>
                  )}
                  <div className={styles.general_rating}>
                     Оценка пользователей 99
                  </div>
               </div>
            </div>
         </Link>
      </>
   )
}
