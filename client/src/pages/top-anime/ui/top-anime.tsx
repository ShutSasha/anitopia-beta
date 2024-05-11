import { FC, useContext, useEffect, useState } from 'react'
import { useStore } from '@app/hooks/useStore'
import { Loader, PageTitle } from '../../../shared'
import { Header } from '../../../widgets/header'
import { Anime } from '../../anime-list/ui/anime-list'
import { formattedAnimeData } from '../../anime-list/helpers/formattedAnimeData'
import $api from '@app/http'
import { observer } from 'mobx-react-lite'
import { AnimeCardsContainerView, ContentContainer, Footer, Wrapper } from '@widgets/index'
import { handleFetchError } from '@app/helpers/functions'

export const TopAnime: FC = observer(() => {
   const { store } = useStore()
   const [animeData, setAnimeData] = useState<Anime[]>([])

   useEffect(() => {
      const fetchAnimeTop = async () => {
         try {
            const response = await $api.get('/anime/top')
            const gettedData = formattedAnimeData(response)
            setAnimeData(gettedData)
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchAnimeTop()
   }, [])

   if (store.isLoading) {
      return <Loader />
   }

   return (
      <Wrapper>
         <Header />
         <ContentContainer style={{ backgroundColor: '#fff', padding: '0px 20px' }}>
            <PageTitle
               style={{
                  margin: '30px 0px',
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Franklin Gothic Medium',
                  textAlign: 'center',
               }}
               title='Топ 100 найпопулярніших аніме на нашому сайті'
            />
            <AnimeCardsContainerView animeData={animeData} />
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
})
