import { FC } from 'react'
import styles from './styles.module.scss'
import AnimeNotFoundGirl from '../../../assets/anime-not-found-girl.png'

interface AnimeNotFoundProps {
   searchTerm: string
}

export const AnimeNotFound: FC<AnimeNotFoundProps> = ({ searchTerm }) => {
   return (
      <div className={styles.no_anime_container}>
         <img src={AnimeNotFoundGirl} className={styles.no_anime_photo} />
         <p className={styles.no_anime_text}>За запитом "{searchTerm}" нічого не знайдено. Спробуйте змінити запит</p>
      </div>
   )
}
