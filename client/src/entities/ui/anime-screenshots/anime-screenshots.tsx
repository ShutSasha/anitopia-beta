import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ImageZoomer, Skeleton } from '../../../shared'

interface Screenshots {
   screenshots: string[]
}

export const AnimeScreenshots: FC<Screenshots> = ({ screenshots }) => {
   const [isLoadingScreenshots, setIsLoadingScreenshots] =
      useState<boolean>(false)

   useEffect(() => {
      setIsLoadingScreenshots(true)
      const image = new Image()
      console.log('screens', screenshots)
      const srcImg = screenshots[screenshots.length - 1] || ''

      image.src = srcImg

      image.onload = () => {
         setIsLoadingScreenshots(false)
      }
   }, [screenshots])

   return (
      <>
         <h2 className={styles.screens_anime_title}>Скриншоты аниме</h2>
         <div className={styles.anime_screensots}>
            {screenshots.map((screen, index) => (
               <div key={index}>
                  {isLoadingScreenshots ? (
                     <Skeleton width={640} height={360} />
                  ) : (
                     <ImageZoomer>
                        <img src={screen} alt='' />
                     </ImageZoomer>
                  )}
               </div>
            ))}
         </div>
      </>
   )
}
