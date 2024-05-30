import { FC } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { ReleasedAnime } from 'pages/home/helpers/useReleasedAnimeLastMonth'

export const ReleasedAnimeLastMonthCard: FC<ReleasedAnime> = ({ _id, title, last_episode,shikimori_id, type }) => {
   const imagePath = `https://shikimori.one/system/animes/original/${shikimori_id}.jpg`
   return (
      <Link to={`anime/${_id}`} className={styles.card}>
         <div className={styles.poster_and_title}>
            <img className={styles.poster} src={imagePath} alt="" />
            <p className={styles.title}>{title}</p>
         </div>
         <div className={styles.episode_and_type}>
            <div className={styles.episode}>{last_episode} серія</div>
            <div className={styles.type}>{type}</div>
         </div>
      </Link>
   )
}
