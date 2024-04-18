import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ImageWithFallback, Skeleton } from '../../../shared'
import { observer } from 'mobx-react-lite'
import { Anime } from '../../../pages/anime-list/ui/anime-list'
import NotLoadedImage from './assets/6e1420ed-dd20-4ba6-bc4d-965a6d6e9718.png'
import { Link } from 'react-router-dom'
import { AnimeRating } from './ui/anime-rating'
import { convertPosterLinkToImageLink } from './helpers/convert-poster-link'

export const AnimeCard: FC<Anime> = observer(({ id, title, material_data, worldart_link }) => {
   const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)

   useEffect(() => {
      setIsLoadingImage(true)
      const image = new Image()
      image.src = material_data?.poster_url || ''
      image.onload = () => {
         setIsLoadingImage(false)
      }
   }, [material_data?.poster_url])

   return (
      <Link to={location.pathname.replace(window.location.pathname, '/anime/') + id} className={styles.anime_card}>
         {isLoadingImage ? (
            <div className={styles.skeleton}>
               <Skeleton width={232} height={310} />
            </div>
         ) : (
            <ImageWithFallback
               primarySrc={convertPosterLinkToImageLink(material_data, worldart_link)}
               secondarySrc={NotLoadedImage}
               altText={title}
               animeTitle={title}
            >
               <AnimeRating rating={material_data.rating} />
               <div className={styles.anime_title_container}>
                  <p className={styles.anime_title}>{title}</p>
               </div>
            </ImageWithFallback>
         )}
      </Link>
   )
})
