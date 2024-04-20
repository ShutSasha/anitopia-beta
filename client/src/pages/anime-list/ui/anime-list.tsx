import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { formattedAnimeData } from '../helpers/formattedAnimeData.ts'
import $api from '@app/http/index.ts'
import { handleFetchError } from '@app/helpers/functions.tsx'
import { AnimeCardsContainerView, AnimeNotFound, ContentContainer, Wrapper } from '@widgets/index.ts'
import { Header } from '@widgets/header'
import { Loader, Pagination, SearchInput } from '../../../shared'
import { Footer } from '@widgets/footer'
import { useStore } from '@app/hooks/useStore.ts'
import styles from './styles.module.scss'

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
   const [animeData, setAnimeData] = useState<Anime[]>([])
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [animesPerPage] = useState<number>(20)
   const [totalAnimeLength, setTotalAnimeLength] = useState<number>(0)
   const [searchTerm, setSearchTerm] = useState<string>('')

   useEffect(() => {
      const fetchAnimeList = async () => {
         try {
            const response = await $api.get(
               `/anime/list?page=${currentPage}&limit=${animesPerPage}${searchTerm ? `&search=${searchTerm}` : ''}`,
            )
            const gettedData = formattedAnimeData(response.data)
            setAnimeData(gettedData)
            setTotalAnimeLength(response.data.length)
         } catch (e) {
            handleFetchError(e)
         }
      }
      fetchAnimeList()
   }, [currentPage, searchTerm])

   const paginate = (pageNumber: number) => {
      setAnimeData([])
      setCurrentPage(pageNumber)
      setSearchTerm(searchTerm ? searchTerm : '')
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
               style={{ marginBottom: '30px' }}
               onClickEvent={(searchParam: string) => {
                  setSearchTerm(searchParam)
               }}
            />
            {animeData.length && animeData.length != 0 && animeData ? (
               <AnimeCardsContainerView animeData={animeData} />
            ) : (
               <AnimeNotFound searchTerm={searchTerm} />
            )}
            {!store.isLoading && (
               <Pagination
                  style={{ marginBottom: '20px' }}
                  animesPerPage={animesPerPage}
                  totalAnimes={totalAnimeLength}
                  paginate={paginate}
                  currentPage={currentPage}
               />
            )}
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
})
