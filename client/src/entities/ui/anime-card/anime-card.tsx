import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ImageWithFallback, Skeleton } from '../../../shared'
import { observer } from 'mobx-react-lite'
import { Anime } from '../../../pages/anime-list/ui/anime-list'
import NotLoadedImage from './assets/6e1420ed-dd20-4ba6-bc4d-965a6d6e9718.png'
import { Link } from 'react-router-dom'

export const AnimeCard: FC<Anime> = observer(
   ({ id, title, material_data, year }) => {
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
         <>
            <Link
               to={
                  location.pathname.replace(
                     window.location.pathname,
                     '/anime/',
                  ) + id
               }
               className={styles.animeCard}
            >
               {isLoadingImage ? (
                  <div className={styles.skeleton}>
                     <Skeleton />
                  </div>
               ) : (
                  <ImageWithFallback
                     primarySrc={material_data?.poster_url}
                     secondarySrc={NotLoadedImage}
                     altText={title}
                  />
               )}
               <div className={styles.content}>
                  <h3>{title}</h3>
                  <p className={styles.anime__genres}>
                     Жанры:&nbsp;
                     {material_data?.genres?.join(', ')}
                  </p>
                  <p className={styles.anime__description}>
                     {material_data?.description
                        ? material_data.description
                        : 'Нет'}
                  </p>
                  <span>{year}</span>
               </div>
            </Link>
         </>
      )
   },
)
