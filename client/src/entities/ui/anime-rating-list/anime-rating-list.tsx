import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Rating } from 'pages/anime-page/ui/anime-page'
import { getUserById } from '@shared/api/users/users'
import { useStore } from '@app/hooks/useStore'
import { RatedAnime } from '@shared/api'
import { handleFetchError } from '@app/helpers/functions'
import { useParams } from 'react-router-dom'

interface Ratings {
   ratings: Rating[] | undefined
}

export const AnimeRatingList: FC<Ratings> = ({ ratings }) => {
   const { store } = useStore()
   const { id } = useParams()
   const [ratedAnime, setRatedAnime] = useState<RatedAnime | undefined>()

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const { data } = await getUserById({ id: store.user.id })

            if (!data.animeRatings) {
               setRatedAnime(undefined)
            }

            if (data.animeRatings) {
               const ratedAnime = data.animeRatings.find((item) => item.animeId === id)
               setRatedAnime(ratedAnime)
            }
         } catch (e) {
            handleFetchError(e)
         }
      }
      if (store.user.id) fetchUser()
   }, [store.user.id])

   return (
      <div className={styles.ratings_container}>
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
         {ratedAnime && (
            <div className={styles.user_rating}>
               Ваш рейтинг: <span>{ratedAnime.rating}</span>
            </div>
         )}
      </div>
   )
}
