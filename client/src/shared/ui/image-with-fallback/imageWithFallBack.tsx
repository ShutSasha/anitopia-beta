import { FC, ReactNode, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { handleFetchError } from '@app/helpers/functions'

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

   useEffect(() => {
      const fetchImage = async () => {
         try {
            let url = primarySrc
            let corsProxy = 'https://cors-anywhere.herokuapp.com/'
            let finalUrl = corsProxy + url
            const res = await fetch(finalUrl)
            const bld = await res.blob()
            setCurrentSrc(URL.createObjectURL(bld))
         } catch (e) {
            handleFetchError(e)
         }
      }
      if (process.env.NODE_ENV !== 'development') {
         fetchImage()
      }
   }, [])

   return (
      <div className={styles.image_wrapper} style={{ backgroundImage: `url(${currentSrc})` }}>
         <img src={currentSrc} alt={altText} onError={handleError} style={{ display: 'none' }} />
         {children}
      </div>
   )
}
