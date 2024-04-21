import React, { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AnimeCardsContainerView, AnimeNotFound, ContentContainer, Wrapper } from '@widgets/index.ts'
import { Header } from '@widgets/header'
import { Loader, Pagination, SearchInput } from '../../../shared'
import { Footer } from '@widgets/footer'
import { useStore } from '@app/hooks/useStore.ts'
import styles from './styles.module.scss'
import { fetchAnimeList } from '../hooks/useCatalogAnime.ts'
import { searchAnime } from '@shared/api/anime/anime.ts'
import { handleFetchError } from '@app/helpers/functions.tsx'
import { formattedAnimeData } from '../helpers/formattedAnimeData.ts'

export interface MaterialData {
   description: string | undefined
   poster_url: string | undefined
   genres: Array<string> | undefined
   rating: number | undefined
}

export interface Anime {
   id: string
   title: string
   material_data: MaterialData
   year: number
   worldart_link: string
   type: string
}

export const AnimeList: FC = observer(() => {
   const { store } = useStore()
   const { catalogAnimeData } = store.animeCatalogStore
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [animesPerPage] = useState<number>(20)
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

   useEffect(() => {
      fetchAnimeList(currentPage, animesPerPage, store)
   }, [currentPage, animesPerPage, store])

   const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber)
      setSearchTerm(searchTerm ? searchTerm : '')
   }

   const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value
      setSearchTerm(newSearchTerm)
      if (timer) {
         clearTimeout(timer)
      }
      setTimer(
         setTimeout(async () => {
            try {
               const response = await searchAnime(newSearchTerm)
               const formattedData = formattedAnimeData(response.data)
               store.animeCatalogStore.setCatalog(formattedData)
               store.animeCatalogStore.setTotalLength(response.data.length)
            } catch (error) {
               handleFetchError(error)
            }
         }, 500),
      )
   }

   if (store.isLoading) {
      return <Loader />
   }

   return (
      <Wrapper>
         <Header />
         <ContentContainer backgroundColor='#fff' padding='0px 20px'>
            <h1 className={styles.title}>Каталог аніме</h1>
            <SearchInput
               style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
               searchTerm={searchTerm}
               handleChangeSearch={handleChangeSearch}
            />
            {catalogAnimeData.length && catalogAnimeData.length != 0 && catalogAnimeData ? (
               <AnimeCardsContainerView animeData={catalogAnimeData} />
            ) : (
               <AnimeNotFound searchTerm={searchTerm} />
            )}
            {store.animeCatalogStore.totalLength > 20 && (
               <Pagination
                  style={{ marginBottom: '20px' }}
                  animesPerPage={animesPerPage}
                  totalAnimes={store.animeCatalogStore.totalLength}
                  paginate={paginate}
                  currentPage={currentPage}
               />
            )}
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
})
