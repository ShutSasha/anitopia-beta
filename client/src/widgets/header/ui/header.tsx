import React, { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Navbar } from '@features'
import { observer } from 'mobx-react-lite'
import { SearchModal } from '@widgets/search-modal/ui/search-modal.tsx'
import { SearchInput } from '@shared/ui/search-input/searchInput.tsx'
import searchIcon from '@widgets/search-modal/assets/search.png'
import { searchAnime } from '@shared/api/anime/anime.ts'
import { formattedAnimeData } from '../../../pages/anime-list/helpers/formattedAnimeData.ts'
import { handleFetchError } from '@app/helpers/functions.tsx'
import { SearchCard } from '@entities/ui/search-card/search-card.tsx'
import { SearchLoader } from '@shared/ui/search-loader/search-loader.tsx'
import { DefaultButton } from '@shared/ui/button/defaultButton.tsx'
import { ISearchCard } from '../types/seach-card.ts'

export const Header: FC = observer(() => {
   const [modalActive, setModalActive] = useState<boolean>(false)
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [animesPerPage] = useState<number>(5)
   const [totalLength, setTotalLength] = useState<number>(0)

   const [searchData, setSearchData] = useState<ISearchCard[]>([])
   const [searchLoading, setSearchLoading] = useState<boolean>(false)

   async function fetchSearchData() {
      try {
         setSearchLoading(true)
         await new Promise((resolve) => setTimeout(resolve, 500))
         const { data } = await searchAnime(searchTerm, currentPage, animesPerPage)
         setTotalLength(data.length)

         if (currentPage === 1) {
            setSearchData(formattedAnimeData(data))
         }

         if (currentPage >= 2) {
            setSearchData((prevSearchData) => {
               const newData = formattedAnimeData(data)
               const uniqueData = newData.filter(
                  (newItem: any) => !prevSearchData.some((prevItem) => prevItem.id === newItem.id),
               )
               return [...prevSearchData, ...uniqueData]
            })
         }
      } catch (e) {
         handleFetchError(e)
      } finally {
         setSearchLoading(false)
      }
   }

   useEffect(() => {
      setCurrentPage(1)
   }, [searchTerm])

   useEffect(() => {
      fetchSearchData()
   }, [searchTerm, currentPage])

   const handleSearchClick = () => {
      setModalActive(true)
   }

   const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value
      setSearchTerm(newSearchTerm)
   }

   return (
      <>
         <div className={styles.header}>
            <div className={styles.container_header}>
               <Navbar searchClickHandler={handleSearchClick} />
            </div>
         </div>
         {modalActive && (
            <SearchModal active={modalActive} setActive={() => setModalActive(false)}>
               <SearchInput searchTerm={searchTerm} handleChangeSearch={handleChangeSearch} />
               {!searchTerm ? (
                  <div className={styles.modal_content_block}>
                     <img className={styles.modal_img} src={searchIcon} alt='search-icon' draggable='false' />
                     <p>Напишіть назву тайтлу, щоб знайти його</p>
                  </div>
               ) : (
                  <div className={styles.modal_content_block}>
                     {searchData &&
                        searchData.map((item: ISearchCard, index: number) => <SearchCard key={index} {...item} />)}
                     {searchLoading && (
                        <div className={styles.loader_container}>
                           <SearchLoader />
                        </div>
                     )}
                     {searchData && totalLength > animesPerPage * currentPage && (
                        <DefaultButton
                           text={`Додати ще ${animesPerPage} аніме`}
                           onClick={() => {
                              setCurrentPage(currentPage + 1)
                           }}
                        />
                     )}
                  </div>
               )}
            </SearchModal>
         )}
      </>
   )
})
