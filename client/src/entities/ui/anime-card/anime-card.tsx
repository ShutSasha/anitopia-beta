import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ImageWithFallback, Skeleton } from '../../../shared'
import { observer } from 'mobx-react-lite'
import { Anime } from '../../../pages/anime-list/ui/anime-list'
import NotLoadedImage from './assets/6e1420ed-dd20-4ba6-bc4d-965a6d6e9718.png'
import { Link } from 'react-router-dom'

export const AnimeCard: FC<Anime> = observer(({ id, title, material_data, year,worldart_link }) => {
   const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)

   function convertPosterLinkToImageLink(posterLink: string): string {
      if(!posterLink){
         return material_data?.poster_url!
      }
      const url = new URL(posterLink);
      const id = url.searchParams.get('id');

      if (!id) {
         console.log("НЕТ")
      }
      const range = Math.ceil(parseInt(id, 10) / 1000) * 1000;

      const imageLink = `http://www.world-art.ru/animation/img/${range}/${id}/1.jpg`;

      return imageLink;
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
                  primarySrc={convertPosterLinkToImageLink(worldart_link)} //worldart_link
                  secondarySrc={NotLoadedImage}
                  altText={title}
               />
            )}
            <div className={styles.content}>
               <h3>{title}</h3>
               <p className={styles.anime__genres}>
                  Жанри:&nbsp;
                  {material_data?.genres?.join(', ')}
               </p>
               <p className={styles.anime__description}>
                  {material_data?.description ? material_data.description : 'Нет'}
               </p>
               <span>{year}</span>
            </div>
         </Link>
      </>
   )
})
