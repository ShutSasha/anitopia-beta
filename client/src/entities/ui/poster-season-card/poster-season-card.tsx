import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { Skeleton } from '../../../shared'

interface Card {
   id: string
   poster_url: string
   shikimori_id: string
   title: string
}

export const PosterSeasonCard: FC<Card> = ({ id, shikimori_id,poster_url, title }) => {
   const [imageIsLoad, setImageIsLoad] = useState<boolean>(false)
   poster_url =`https://shikimori.one/system/animes/original/${shikimori_id}.jpg`
   useEffect(() => {
      setImageIsLoad(true)
      const image = new Image()
      image.src = poster_url || ''
      image.onload = () => {
         setImageIsLoad(false)
      }
   }, [])

   return (
      <>
         {imageIsLoad ? (
            <div className={styles.card_background}>
               <Skeleton width={220} height={300} />
            </div>
         ) : (
            <Link to={`anime/${id}`} className={styles.card}>
               <img src={poster_url} className={styles.card_background} />
            </Link>
         )}

         <h3 title={title} className={styles.card_text_block}>
            {title}
         </h3>
      </>
   )
}
