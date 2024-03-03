import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ImageZoomer, Skeleton } from '../../../shared'

interface Screenshots {
   screenshots: string[] | undefined
}

export const AnimeScreenshots: FC<Screenshots> = ({ screenshots }) => {
   const [isLoading, setLoading] = useState<boolean>(false)

   useEffect(() => {
      if (screenshots) {
         setLoading(true)

         const image = new Image()

         const srcImg = screenshots[screenshots.length - 1] || ''

         image.src = srcImg

         image.onload = () => {
            setLoading(false)
         }
      }
   }, [screenshots])

   if (!screenshots) {
      return <div>Скриншотов не завезли</div>
   }

   return (
      <>
         <h2 className={styles.screens_anime_title}>Скриншоты аниме</h2>
         <div className={styles.anime_screensots}>
            {screenshots.map((screen, index) => (
               <div key={index}>
                  {isLoading ? (
                     <Skeleton width={256} height={144} />
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
