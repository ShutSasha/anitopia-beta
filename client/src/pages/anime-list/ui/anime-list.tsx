import { FC, useContext, useEffect, useState } from 'react'
import { Header } from '../../../widgets/header'
import { Context } from '../../../main.tsx'
import { Loader, Pagination, SearchInput } from '../../../shared'
import styles from './styles.module.scss'
import axios from 'axios'
import { AnimeCard } from '../../../entities'
import { observer } from 'mobx-react-lite'
import { formattedAnimeData } from '../helpers/formattedAnimeData.ts'

export interface MaterialData {
   description: string | undefined
   poster_url: string
   genres: Array<string>
   shikimori_rating: number | undefined
}

export interface Anime {
   id: string
   title: string
   material_data: MaterialData
   year: number
}

export const AnimeList: FC = observer(() => {
   const { store } = useContext(Context)
   const [animeData, setAnimeData] = useState<Anime[]>([])
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [animesPerPage] = useState<number>(10)
   const [totalAnimeLength, setTotalAnimeLength] = useState<number>(0)
   const [searchTerm, setSearchTerm] = useState('')

   useEffect(() => {
      const fetchAnimeList = async () => {
         store.setLoading(true)
         try {
            const response = await axios.get(
               `http://localhost:5000/api/anime/list-anime?page=${currentPage}&limit=${animesPerPage}${searchTerm ? `&search=${searchTerm}` : ''}`,
            )
            const gettedData = formattedAnimeData(response.data)
            setAnimeData(gettedData)
            setTotalAnimeLength(response.data.length)
         } catch (e) {
            console.error(e)
         } finally {
            store.setLoading(false)
         }
      }
      fetchAnimeList()
   }, [currentPage, searchTerm])

   const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber)
      setAnimeData([])
      setSearchTerm(searchTerm ? searchTerm : '')
   }

   if (store.isLoading) {
      return <Loader />
   }

   return (
      <>
         <Header />
         <div className={styles.wrapper}>
            <div className={styles.container}>
               <h1 className={styles.title}>Список Аниме</h1>
               <SearchInput
                  onClickEvent={(searchParam: string) => {
                     setSearchTerm(searchParam)
                  }}
               />
               <ul className={styles.cards__container}>
                  {animeData.length != 0 ? (
                     <AnimeCard animes={animeData} />
                  ) : (
                     <h1>НЕТ АНИМЕ</h1>
                  )}
                  {!store.isLoading && (
                     <Pagination
                        animesPerPage={animesPerPage}
                        totalAnimes={totalAnimeLength}
                        paginate={paginate}
                        currentPage={currentPage}
                     />
                  )}
               </ul>
            </div>
         </div>
      </>
   )
})
