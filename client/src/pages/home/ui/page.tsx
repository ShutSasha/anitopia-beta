import { FC } from 'react'
import styles_h from './styles.module.scss'
import { Header } from '../../../widgets/header'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { Loader } from '../../../shared'
import { Splider } from '../../../widgets/splider'
import { useFetchAnimeSeason } from '../helpers/fetchAnimeSeason'
import { DynamicAnimeSection } from '@widgets/dynamic-anime-section'
import { useUpdatedAnime } from '../helpers/useUpdatedAnime'
import { useReleasedAnimeLastMonth } from '../helpers/useReleasedAnimeLastMonth'
import { ReleasedAnimeLastMonthCard, UpdatedAnimeCard } from '@entities/index'
import { ContentContainer, Footer, Wrapper } from '@widgets/index'

export interface AnimeSeason {
   id: string
   title: string
   poster_url: string
}

export const HomePage: FC = observer(() => {
   const { store } = useStore()
   const animeSeasonData = useFetchAnimeSeason()
   const updatedAnime = useUpdatedAnime()
   const releasedAnime = useReleasedAnimeLastMonth()

   if (store.isLoading) {
      return <Loader />
   }

   return (
      <Wrapper>
         <Header />
         <ContentContainer style={{ padding: '25px 0 0 0' }}>
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
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
})
