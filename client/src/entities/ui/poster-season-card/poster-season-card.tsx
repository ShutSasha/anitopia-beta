import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { Skeleton } from '../../../shared'

interface Card {
   id: string
   poster_url: string
   title: string
}

export const PosterSeasonCard: FC<Card> = ({ id, poster_url, title }) => {
   const [imageIsLoad, setImageIsLoad] = useState<boolean>(false)

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

         <div title={title} className={styles.card_text_block}>
            {title}
         </div>
      </>
   )
}
