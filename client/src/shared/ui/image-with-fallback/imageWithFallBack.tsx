import { CSSProperties, FC, ReactNode, useState } from 'react'
import styles from './styles.module.scss'

interface ImageProps {
   primarySrc: string | undefined
   secondarySrc: string
   altText: string
   textStyle?: string
   animeTitle?: string
   children?: ReactNode
   style?: CSSProperties
}

export const ImageWithFallback: FC<ImageProps> = ({ primarySrc, secondarySrc, style, altText, children }) => {
   const [currentSrc, setCurrentSrc] = useState<string | undefined>(primarySrc)

   const handleError = () => {
      setCurrentSrc(secondarySrc)
   }

   return (
      <div className={styles.image_wrapper} style={{ backgroundImage: `url(${currentSrc})`, ...style }}>
         <img src={currentSrc} alt={altText} onError={handleError} style={{ display: 'none' }} />
         {children}
      </div>
   )
}
