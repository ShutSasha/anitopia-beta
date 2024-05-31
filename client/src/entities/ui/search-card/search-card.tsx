import { FC } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { ISearchCard } from '@widgets/header/types/seach-card'

export const SearchCard: FC<ISearchCard> = ({ id, title, shikimori_id, year, title_orig, material_data }) => {
   material_data.poster_url = `https://shikimori.one/system/animes/original/${shikimori_id}.jpg`
   return (
      <Link
         to={location.pathname.replace(window.location.pathname, '/anime/') + id}
         className={styles.card_body}
         // style={{ '--hover-bg-image': `url(${material_data.poster_url})` } as React.CSSProperties} //Posible
      >
         <div className={styles.card_content}>
            <img className={styles.card_poster} src={material_data.poster_url} alt="" />
            <div className={styles.card_info}>
               <span className={styles.reset_span}>{material_data.anime_kind}</span>
               <p className={styles.main_title}>{title}</p>
               <p className={styles.title_orig}>{title_orig}</p>
               <span className={styles.reset_span}>{year}</span>
            </div>
         </div>
      </Link>
   )
}
