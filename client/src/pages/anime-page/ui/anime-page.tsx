import { FC, useContext } from 'react'
import { Context } from '../../../main'
import { Loader } from '../../../shared'
import { Header } from '../../../widgets/header'
import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { AnimeGeneralInfo } from '../../../widgets/anime_general_info'
import { PlayerBlock } from '../../../widgets/Player-block/ui/player-block'
import { AnimeScreenshots } from '../../../entities/ui/anime-screenshots/anime-screenshots'
import { useAnime } from '../helpers/useAnime'
import { AnimeComments } from '../../../widgets/anime-comments'

export interface Rating {
   rating: number
   logo: string
   height: string
   width: string
}

export const AnimePage: FC = observer(() => {
   const { store } = useContext(Context)
   const { anime, ratings } = useAnime()

   if (store.isLoading || !anime) {
      return <Loader />
   }

   return (
      <>
         <Header />
         <div className={styles.wrapper}>
            <div className={styles.container}>
               <AnimeGeneralInfo anime={anime} ratings={ratings} />
               <PlayerBlock link={anime.link} />
               <AnimeScreenshots screenshots={anime.screenshots} />
               <AnimeComments/>
            </div>
         </div>
      </>
   )
})
