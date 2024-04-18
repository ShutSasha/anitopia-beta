import { FC } from 'react'
import styles from './anime-rating.module.scss'
import star_icon from '../assets/Star.svg'

interface Props {
   rating: number | undefined
}

export const AnimeRating: FC<Props> = ({ rating }) => {
   return (
      <span className={styles.anime_rating}>
         <img className={styles.star_icon} src={star_icon} alt='star' />
         <p>{rating ? rating : 0}</p>
      </span>
   )
}
