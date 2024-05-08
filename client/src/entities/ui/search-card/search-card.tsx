import { FC } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { ISearchCard } from '@widgets/header/types/seach-card'

export const SearchCard: FC<ISearchCard> = ({ id, title, material_data }) => {
   return (
      <Link to={location.pathname.replace(window.location.pathname, '/anime/') + id} className={styles.card_body}>
         <div className={styles.card_content}>
            <img className={styles.card_poster} src={material_data.poster_url} alt='' />
            <div className={styles.card_info}>
               <p>{title}</p>
            </div>
         </div>
      </Link>
   )
}
