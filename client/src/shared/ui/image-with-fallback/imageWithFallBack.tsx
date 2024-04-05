import { FC, ReactNode, useState } from 'react'
import styles from './styles.module.scss'

interface ImageProps {
   primarySrc: string | undefined
   secondarySrc: string
   altText: string
   textStyle?: string
   animeTitle?: string
   children: ReactNode
}

export const ImageWithFallback: FC<ImageProps> = ({ primarySrc, secondarySrc, altText, children }) => {
   const [currentSrc, setCurrentSrc] = useState<string | undefined>(primarySrc)

   const handleError = () => {
      setCurrentSrc(secondarySrc)
   }

   return (
      <div className={styles.imageWrapper} style={{ backgroundImage: `url(${currentSrc})` }}>
         {children}
         <img className={styles.image} src={currentSrc} alt={altText} onError={handleError} />
      </div>
   )
}
