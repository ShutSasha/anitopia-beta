import { FC, useContext, useEffect, useState } from 'react'
import { Header } from '../../../widgets/header'
import { Context } from '../../../main.tsx'
import { Loader, Pagination, SearchInput } from '../../../shared'
import styles from './styles.module.scss'
import axios from 'axios'
import { AnimeCard } from '../../../entities'
import { observer } from 'mobx-react-lite'
import { formattedAnimeData } from '../helpers/formattedAnimeData.ts'
import NoAnimePhoto from '../assets/Anime-Girl-Sad-Free-PNG.png'

export interface MaterialData {
   description: string | undefined
   poster_url: string | undefined
   genres: Array<string> | undefined
   shikimori_rating: number | undefined
}

export interface Anime {
   id: string
   title: string
   material_data: MaterialData | undefined
   year: number
}

export const AnimeList: FC = observer(() => {
   const { store } = useContext(Context)
   const [animeData, setAnimeData] = useState<Anime[]>([])
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [animesPerPage] = useState<number>(10)
   const [totalAnimeLength, setTotalAnimeLength] = useState<number>(0)
   const [searchTerm, setSearchTerm] = useState<string>('')

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
            console.log(response.data)
         } catch (e) {
            console.error(e)
         } finally {
            store.setLoading(false)
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
               {animeData.length && animeData.length != 0 && animeData ? (
                  <ul className={styles.cards__container}>
                     {animeData.map((item, index) => (
                        <li key={index}>
                           <AnimeCard {...item} />
                        </li>
                     ))}
                     {!store.isLoading && (
                        <Pagination
                           animesPerPage={animesPerPage}
                           totalAnimes={totalAnimeLength}
                           paginate={paginate}
                           currentPage={currentPage}
                        />
                     )}
                  </ul>
               ) : (
                  <div className={styles.no_anime_container}>
                     <img src={NoAnimePhoto} className={styles.no_anime_photo} />
                     <p className={styles.no_anime_text}>
                        По запросу "{searchTerm}" ничего не найдено. Попробуйте изменить запрос
                     </p>
                  </div>
               )}
            </div>
         </div>
      </>
   )
})
