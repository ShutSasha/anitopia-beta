import { FC, useContext } from 'react'
import styles_h from './styles.module.scss'
import { Header } from '../../../widgets/header'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import { Loader } from '../../../shared'
import { Splider } from '../../../widgets/splider'
import { useFetchAnimeSeasin } from '../helpers/fetchAnimeSeason'
import { DynamicAnimeSection } from '@widgets/dynamic-anime-section'
import { useUpdatedAnime } from '../helpers/useUpdatedAnime'
import { useReleasedAnimeLastMonth } from '../helpers/useReleasedAnimeLastMonth'
import { ReleasedAnimeLastMonthCard, UpdatedAnimeCard } from '@entities/index'

export interface AnimeSeason {
   id: string
   title: string
   poster_url: string
}

export const HomePage: FC = observer(() => {
   const { store } = useContext(Context)
   const animeSeasonData = useFetchAnimeSeasin()
   const updatedAnime = useUpdatedAnime()
   const releasedAnime = useReleasedAnimeLastMonth()

   if (store.isLoading) {
      return <Loader />
   }

   return (
      <>
         <Header />
         <div className={styles_h.wrapper}>
            <div className={styles_h.container}>
               <div className={styles_h.anime_season}>
                  <div className={styles_h.anime_season_inner}>
                     <h2 className={styles_h.anime_season_title}>Аніме зимового сезона</h2>
                  </div>
                  <Splider animeSeasonData={animeSeasonData} />
               </div>
               <div className={styles_h.updated_and_released_anime}>
                  <DynamicAnimeSection header_title='Оновлене аніме'>
                     {updatedAnime && updatedAnime.map((item, index) => <UpdatedAnimeCard key={index} {...item} />)}
                  </DynamicAnimeSection>
                  <DynamicAnimeSection header_title='Нещодавно вийшли аніме'>
                     {releasedAnime &&
                        releasedAnime.map((item, index) => <ReleasedAnimeLastMonthCard key={index} {...item} />)}
                  </DynamicAnimeSection>
               </div>
            </div>
         </div>
      </>
   )
})
