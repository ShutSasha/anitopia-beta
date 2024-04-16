import { FC, useContext, useEffect, useState } from 'react'
import { Header } from '@widgets/header'
import { Context } from '../../../main.tsx'
import { Loader, Pagination, SearchInput } from '../../../shared'
import styles from './styles.module.scss'
import { AnimeCard } from '../../../entities'
import { observer } from 'mobx-react-lite'
import { formattedAnimeData } from '../helpers/formattedAnimeData.ts'
import NoAnimePhoto from '../assets/Anime-Girl-Sad-Free-PNG.png'
import $api from '@app/http/index.ts'
import { handleFetchError } from '@app/helpers/functions.tsx'
import { Footer } from '@widgets/footer'

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
            const response = await $api.get(
               `/anime/list?page=${currentPage}&limit=${animesPerPage}${searchTerm ? `&search=${searchTerm}` : ''}`,
            )
            const gettedData = formattedAnimeData(response.data)
            setAnimeData(gettedData)
            setTotalAnimeLength(response.data.length)
         } catch (e) {
            handleFetchError(e)
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
         <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
               <h1 className={styles.title}>Каталог аніме</h1>
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
                  </ul>
               ) : (
                  <div className={styles.no_anime_container}>
                     <img src={NoAnimePhoto} className={styles.no_anime_photo} />
                     <p className={styles.no_anime_text}>
                        За запитом "{searchTerm}" нічого не знайдено. Спробуйте змінити запит
                     </p>
                  </div>
               )}
               {!store.isLoading && (
                  <Pagination
                     animesPerPage={animesPerPage}
                     totalAnimes={totalAnimeLength}
                     paginate={paginate}
                     currentPage={currentPage}
                  />
               )}
            </div>
            <Footer />
         </div>
      </>
   )
})
