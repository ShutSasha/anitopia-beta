import { FC } from 'react'
import styles from './styles.module.scss'
import { Anime } from '@shared/api'
import { Link } from 'react-router-dom'
export const SearchCard: FC<Anime> = ({ id, title, material_data }) => {
   return (
      <>
         <Link to={location.pathname.replace(window.location.pathname, '/anime/') + id} className={styles.card_body}>
            <div className={styles.card_content}>
               <img className={styles.card_poster} src={material_data.poster_url} alt='' />
               <div className={styles.card_info}>
                  <p>{title}</p>
               </div>
            </div>
         </Link>
      </>
   )
}
