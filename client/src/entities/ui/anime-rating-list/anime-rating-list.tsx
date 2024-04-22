import { FC } from 'react'
import styles from './styles.module.scss'
import { Rating } from 'pages/anime-page/ui/anime-page'

interface Ratings {
   ratings: Rating[] | undefined
}

export const AnimeRatingList: FC<Ratings> = ({ ratings }) => {
   return (
      <ul className={styles.anime_ratings_list}>
         {ratings !== undefined &&
            ratings.map((rating, index) => (
               <div key={index}>
                  {rating.rating && (
                     <li className={styles.anime_rating_item}>
                        <img
                           style={{
                              width: rating.width,
                              height: rating.height,
                           }}
                           src={rating.logo}
                           alt=''
                        />
                        {rating.rating}
                     </li>
                  )}
               </div>
            ))}
      </ul>
   )
}
