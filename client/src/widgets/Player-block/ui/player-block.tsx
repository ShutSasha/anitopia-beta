import { FC, useEffect } from 'react'
import styles from './styles.module.scss'

interface PlayerProps {
   link: string
}

export const PlayerBlock: FC<PlayerProps> = ({ link }) => {
   useEffect(() => {
      const fetchAnime = async () => {
         const res = await fetch('https://api.lib.social/api/episodes/118743?')
         const data = await res.json()
         console.log(data)
         console.log(link)
      }
      fetchAnime()
   }, [])
   return (
      <div className={styles.player_container}>
         {/* <iframe src={link} width='610px' height='370px' allow='autoplay *; fullscreen *'></iframe> */}
         {/* https://api.lib.social/api/anime?fields[]=rate_avg&fields[]=rate&fields[]=releaseDate&q=%D1%81%D0%B8%D0%BD%D0%B8%D0%B9%20%D0%B0%D1%80%D1%85%D0%B8%D0%B2 */}
         {/* //kodik.info/seria/1299191/888609c22d3355ca1183a74b908387fa/720p */}
         {/* <iframe
            src={`${playerjs}?file=https://www.youtube.com/watch?v=ZXsQAXx_ao0&t=1s&ab_channel=MotivaShian`}
            type='text/html'
            width='ширина'
            height='высота'
            frameborder='0'
            allowfullscreen
         ></iframe> */}
      </div>
   )
}
