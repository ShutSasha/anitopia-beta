import { FC, } from 'react'
import { useStore } from '@app/hooks/useStore'
import { Loader } from '../../../shared'
import { Header } from '@widgets/header'
import { observer } from 'mobx-react-lite'
import { AnimeGeneralInfo } from '@widgets/anime_general_info'
import { PlayerBlock } from '@widgets/Player-block/ui/player-block.tsx'
import { AnimeScreenshots } from '@entities/ui/anime-screenshots/anime-screenshots.tsx'
import { useAnime } from '../helpers/useAnime'
import { AnimeComments } from '@widgets/anime-comments'
import { ContentContainer, Footer, Wrapper } from '@widgets/index'

export interface Rating {
   rating: number
   logo: string
   height: string
   width: string
}

export const AnimePage: FC = observer(() => {
   const { store } = useStore()
   const { anime, ratings } = useAnime()

   if (store.isLoading || !anime) {
      return <Loader />
   }

   return (
      <Wrapper>
         <Header />
         <ContentContainer style={{ padding: '25px 20px', backgroundColor: '#fff' }}>
            <AnimeGeneralInfo anime={anime} ratings={ratings} />
            <PlayerBlock link={anime.link} />
            <AnimeScreenshots screenshots={anime.screenshots} />
            <AnimeComments />
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
})
