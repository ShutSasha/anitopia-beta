import { FC } from 'react'
import styles from './styles.module.scss'

interface PlayerProps {
   link: string
}

export const PlayerBlock: FC<PlayerProps> = ({ link }) => {
   return (
      <div className={styles.player_container}>
         {link}
         {/* <iframe
            src={link}
            width='610px'
            height='370px'
            allow='autoplay *; fullscreen *'
         ></iframe> */}
      </div>
   )
}
