import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../../../main'
import { Loader } from '../../../shared'
import { Header } from '../../../widgets/header'
import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { AnimeGeneralInfo } from '../../../widgets/anime_general_info'
import { PlayerBlock } from '../../../widgets/Player-block/ui/player-block'
import { AnimeScreenshots } from '../../../entities/ui/anime-screenshots/anime-screenshots'
import { IAnime } from '../../../app/models/IAnime'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
   arraySetRatings,
   objSetAnimeState,
} from '../../random-anime/helpers/objectsFetchAnime'

export interface Rating {
   rating: number
   logo: string
   height: string
   width: string
}

export const AnimePage: FC = observer(() => {
   const { store } = useContext(Context)
   const [anime, setAnime] = useState<IAnime>()
   const [ratings, setRatings] = useState<Rating[]>()
   const { id } = useParams()

   useEffect(() => {
      const getAnime = async () => {
         try {
            store.setLoading(true)
            const res = await axios.get(`http://localhost:5000/api/anime/${id}`)
            const animeData = objSetAnimeState(res)
            const ratingData = arraySetRatings(res)
            console.log(res.data)
            setAnime(animeData)
            setRatings(ratingData)
         } catch (error) {
            console.error(error)
         } finally {
            store.setLoading(false)
         }
      }
      getAnime()
   }, [])

   if (store.isLoading || !anime) {
      return <Loader />
   }

   return (
      <>
         <Header />
         {anime && (
            <div className={styles.wrapper}>
               <div className={styles.container}>
                  {anime.link && (
                     <>
                        <AnimeGeneralInfo anime={anime} ratings={ratings} />
                        <PlayerBlock link={anime.link} />
                        {anime.screenshots && (
                           <AnimeScreenshots screenshots={anime.screenshots} />
                        )}
                     </>
                  )}
               </div>
            </div>
         )}
      </>
   )
})
