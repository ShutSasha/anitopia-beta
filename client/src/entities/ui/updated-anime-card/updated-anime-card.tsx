import { FC } from 'react'
import styles from './styles.module.scss'
import { UpdatedAnime } from 'pages/home/helpers/useUpdatedAnime'
import { Link } from 'react-router-dom'

export const UpdatedAnimeCard: FC<UpdatedAnime> = ({ _id, title,shikimori_id,last_episode, poster_url }) => {
   poster_url =`https://shikimori.one/system/animes/original/${shikimori_id}.jpg`
   return (
      <Link to={`anime/${_id}`} className={styles.card}>
         <div className={styles.poster_and_title}>
            <img className={styles.poster} src={poster_url} alt='' />
            <p className={styles.title}>{title}</p>
         </div>
         <div className={styles.episode}>{last_episode} серія</div>
      </Link>
   )
}
