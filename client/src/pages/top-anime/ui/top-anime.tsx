import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../../../main'
import { Loader } from '../../../shared'
import { Header } from '../../../widgets/header'
import styles from './styles.module.scss'
import { Anime } from '../../anime-list/ui/anime-list'
import { formattedAnimeData } from '../../anime-list/helpers/formattedAnimeData'
import { AnimeCard } from '../../../entities'
import $api from '@app/http'
import { observer } from 'mobx-react-lite'

export const TopAnime: FC = observer(() => {
   const { store } = useContext(Context)
   const [animeData, setAnimeData] = useState<Anime[]>([])

   useEffect(() => {
      const fetchAnimeTop = async () => {
         try {
            store.setLoading(true)
            const response = await $api.get('/anime/top-anime')
            const gettedData = formattedAnimeData(response)
            setAnimeData(gettedData)
         } catch (error) {
            console.error(error)
         } finally {
            store.setLoading(false)
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
               {animeData.map((item, index) => (
                  <div key={index}>
                     <AnimeCard {...item} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
})
