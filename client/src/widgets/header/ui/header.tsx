import React, { FC, useState } from 'react'
import styles from './styles.module.scss'
import { Navbar } from '@features'
import { observer } from 'mobx-react-lite'
import { SearchModal } from '@widgets/search-modal/ui/search-modal.tsx'
import { SearchInput } from '@shared/ui/search-input/searchInput.tsx'
import searchIcon from '@widgets/search-modal/assets/search.png'
import { useStore } from '@app/hooks/useStore.ts'
import { searchAnime } from '@shared/api/anime/anime.ts'
import { formattedAnimeData } from '../../../pages/anime-list/helpers/formattedAnimeData.ts'
import { handleFetchError } from '@app/helpers/functions.tsx'
import { useQuery } from 'react-query'
import { SearchCard } from '@entities/ui/search-card/search-card.tsx'
import { SearchLoader } from '@shared/ui/search-loader/search-loader.tsx'
import { DefaultButton } from '@shared/ui/button/defaultButton.tsx'

export const Header: FC = observer(() => {
   const { store } = useStore()
   const [modalActive, setModalActive] = useState<boolean>(false)
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [animesPerPage] = useState<number>(20)
   const [totalLength, setTotalLength] = useState<number>(0)

   const {
      data: searchData,
      isLoading: searchLoading,
      isError: searchError,
   } = useQuery(
      ['search', searchTerm, currentPage],
      async () => {
         try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            const response = await searchAnime(searchTerm, currentPage, animesPerPage)
            const responseData = response.data
            setTotalLength(responseData.length)
            const formattedData = formattedAnimeData(response.data)
            return formattedData
         } catch (e) {
            handleFetchError(e)
         }
      },
      {
         enabled: !!searchTerm,
      },
   )
   if (searchData) {
      console.log(totalLength)
   }

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
               <SearchInput
                  // style={{ width: 'inherit', borderRadius: '0px' }}
                  searchTerm={searchTerm}
                  handleChangeSearch={handleChangeSearch}
               />
               {searchLoading && (
                  <div className={styles.loader_container}>
                     <SearchLoader />
                  </div>
               )}
               {!searchTerm ? (
                  <div className={styles.modal_content_block}>
                     <img className={styles.modal_img} src={searchIcon} alt='search-icon' draggable='false' />
                     <p>Напишіть назву тайтлу, щоб знайти його</p>
                  </div>
               ) : (
                  <div className={styles.modal_content_block}>
                     {searchData && searchData.map((item: any, index: number) => <SearchCard key={index} {...item} />)}
                     {searchData && totalLength > animesPerPage * currentPage && (
                        <DefaultButton
                           text={'Додати ще 20'}
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
