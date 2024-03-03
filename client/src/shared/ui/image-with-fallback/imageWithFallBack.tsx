import { FC, useState } from 'react'
import styles from './styles.module.scss'

interface ImageProps {
   primarySrc: string | undefined
   secondarySrc: string
   altText: string
}

export const ImageWithFallback: FC<ImageProps> = ({
   primarySrc,
   secondarySrc,
   altText,
   ...otherProps
}) => {
   const [currentSrc, setCurrentSrc] = useState<string | undefined>(primarySrc)

   const handleError = () => {
      setCurrentSrc(secondarySrc)
   }

   return (
      <img
         className={styles.image}
         src={currentSrc}
         alt={altText}
         onError={handleError}
         {...otherProps}
      />
   )
}
