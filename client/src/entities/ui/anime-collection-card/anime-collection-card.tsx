import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Collection } from '../../../features/ui/anime-collection-inner/anime-collection-inner'
import styles from './styles.module.scss'
import user_rate_star from './assets/user-rate-star.png'
import default_star from './assets/default-star.svg'
import $api from '@app/http'

export const AnimeCollectionCard: FC<Collection> = ({ rating, animeId,shikimori_id, title }) => {
   const [generalAnimeRating, setGeneralAnimeRating] = useState<number>()
   const imagePath = `https://shikimori.one/system/animes/original/${shikimori_id}.jpg`

   useEffect(() => {
      const fetchAnimeRating = async () => {
         const response = await $api.get(`/anime/${animeId}`)
         const is_shikimori_rating = response.data.material_data.shikimori_rating !== undefined
         const shikimori_rating = response.data.material_data.shikimori_rating
         if (is_shikimori_rating) {
            setGeneralAnimeRating(shikimori_rating)
         }
         if (!is_shikimori_rating) {
            setGeneralAnimeRating(0)
         }
      }

      fetchAnimeRating()
   }, [])

   return (
      <>
         <Link to={location.pathname.replace(window.location.pathname, '/anime/') + animeId}>
            <div className={styles.card}>
               <div className={styles.card_poster_title}>
                  <img className={styles.poster} src={imagePath} alt='' />
                  <div className={styles.title}>{title}</div>
               </div>
               <div className={styles.ratings}>
                  {rating && (
                     <div title='Рейтинг користувача' className={styles.user_rating}>
                        <img className={styles.user_rate_star} src={user_rate_star} alt='' />
                        <p>{rating}</p>
                     </div>
                  )}
                  {generalAnimeRating && (
                     <div title='Рейтинг аніме' className={styles.anime_rating}>
                        <img src={default_star} alt='' />
                        <p className={styles.anime_rating_text}>{generalAnimeRating}</p>
                     </div>
                  )}
               </div>
            </div>
         </Link>
      </>
   )
}
