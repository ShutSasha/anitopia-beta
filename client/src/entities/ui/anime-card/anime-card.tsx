import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ImageWithFallback, Skeleton } from '../../../shared'
import { observer } from 'mobx-react-lite'
import { Anime } from '../../../pages/anime-list/ui/anime-list'
import NotLoadedImage from './assets/6e1420ed-dd20-4ba6-bc4d-965a6d6e9718.png'
import { Link } from 'react-router-dom'

export const AnimeCard: FC<Anime> = observer(({ id, title, material_data, worldart_link }) => {
   const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)

   function convertPosterLinkToImageLink(posterLink: string): string {
      if (!posterLink) {
         return material_data.poster_url!
      }

      const url = new URL(posterLink)
      const id: string = url.searchParams.get('id') ?? ''
      const range = Math.ceil(parseInt(id, 10) / 1000) * 1000

      const imageLink = `http://www.world-art.ru/animation/img/${range}/${id}/1.jpg`

      return imageLink
   }

   useEffect(() => {
      setIsLoadingImage(true)
      const image = new Image()
      image.src = material_data?.poster_url || ''
      image.onload = () => {
         setIsLoadingImage(false)
      }
   }, [material_data?.poster_url])

   return (
      <>
         <Link to={location.pathname.replace(window.location.pathname, '/anime/') + id} className={styles.animeCard}>
            {isLoadingImage ? (
               <div className={styles.skeleton}>
                  <Skeleton width={150} height={250} />
               </div>
            ) : (
               <ImageWithFallback
                  primarySrc={convertPosterLinkToImageLink(worldart_link)}
                  secondarySrc={NotLoadedImage}
                  altText={title}
                  animeTitle={title}
               >
                  <span className={styles.anime__rating}>
                     <svg width='20' height='19' viewBox='0 0 20 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                           d='M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z'
                           fill='#FFD700'
                        />
                     </svg>
                     <p>{material_data?.rating}</p>
                  </span>
                  <div className={styles.information}>
                     <p className={styles.image__text}>{title}</p>
                  </div>
               </ImageWithFallback>
            )}
         </Link>
      </>
   )
})
