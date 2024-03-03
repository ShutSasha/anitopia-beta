import { FC, ReactNode, useCallback, useState } from 'react'
import styles from './styles.module.scss'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface ImageZoomerProps {
   children: ReactNode
}

export const ImageZoomer: FC<ImageZoomerProps> = ({ children }) => {
   const [isZoomed, setIsZoomed] = useState(false)

   const handleZoomChange = useCallback((shouldZoom: any) => {
      setIsZoomed(shouldZoom)
   }, [])

   return (
      <div className={styles.zoom_container}>
         <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
            {children}
         </ControlledZoom>
      </div>
   )
}
