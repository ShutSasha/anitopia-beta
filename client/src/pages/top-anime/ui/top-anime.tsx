import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../../../main'
import { Loader } from '../../../shared'
import { Header } from '../../../widgets/header'
import styles from './styles.module.scss'
import { Anime } from '../../anime-list/ui/anime-list'
import { formattedAnimeData } from '../../anime-list/helpers/formattedAnimeData'
import { AnimeCard } from '../../../entities'
import $api from '@app/http'

export const TopAnime: FC = () => {
   const { store } = useContext(Context)
   const [animeData, setAnimeData] = useState<Anime[]>([])

   useEffect(() => {
      const fetchAnimeTop = async () => {
         try {
            const response = await $api.get('/anime/top-anime')
            const gettedData = formattedAnimeData(response)
            setAnimeData(gettedData)
         } catch (error) {
            console.error(error)
         }
      }
      fetchAnimeTop()
   }, [])

   if (store.isLoading) {
      return <Loader />
   }

   return (
      <div>
         <Header />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               <div>Top-100 page</div>
               {animeData.length && animeData.length != 0 && animeData ? (
                  animeData.map((item, index) => (
                     <div key={index}>
                        <AnimeCard {...item} />
                     </div>
                  ))
               ) : (
                  <h1>НЕМАЄ АНІМЕ</h1>
               )}
            </div>
         </div>
      </div>
   )
}
