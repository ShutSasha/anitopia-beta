import { FC } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { ReleasedAnime } from 'pages/home/helpers/useReleasedAnimeLastMonth'

export const ReleasedAnimeLastMonthCard: FC<ReleasedAnime> = ({ _id, title, last_episode, poster_url, type }) => {
   return (
      <Link to={`anime/${_id}`} className={styles.card}>
         <div className={styles.poster_and_title}>
            <img className={styles.poster} src={poster_url} alt='' />
            <p className={styles.title}>{title}</p>
         </div>
         <div className={styles.episode_and_type}>
            <div className={styles.episode}>{last_episode} серія</div>
            <div className={styles.type}>{type}</div>
         </div>
      </Link>
   )
}
