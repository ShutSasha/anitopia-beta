import { FC, useCallback, useState } from 'react'
import styles from './styles.module.scss'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface ImageZoomerProps {
   imagePath: string
}
export const ImageZoomer: FC<ImageZoomerProps> = ({ imagePath }) => {
   const [isZoomed, setIsZoomed] = useState(false)

   const handleZoomChange = useCallback((shouldZoom: any) => {
      setIsZoomed(shouldZoom)
   }, [])

   return (
      <div className={styles.zoom_container}>
         <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
            <img
               className={styles.image_container}
               src={imagePath}
               alt='Описание изображения'
               width='500'
            />
         </ControlledZoom>
      </div>
   )
}
