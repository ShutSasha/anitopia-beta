import React, { FC, useState } from 'react'
import styles from './styles.module.scss'
import { Navbar } from '@features'
import { observer } from 'mobx-react-lite'
import { SearchModal } from '@widgets/search-modal/ui/search-modal.tsx'
import { SearchInput } from '@shared/ui/search-input/searchInput.tsx'
import searchIcon from '@widgets/search-modal/assets/search.png'
import { useStore } from '@app/hooks/useStore.ts'
export const Header: FC = observer(() => {
   const { store } = useStore()
   const [modalActive, setModalActive] = useState<boolean>(false)
   const [searchTerm, setSearchTerm] = useState<string>('')
   const { catalogAnimeData } = store.animeCatalogStore

   const handleSearchClick = () => {
      setModalActive(true)
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
                  handleChangeSearch={(e) => {
                     setSearchTerm(e.target.value)
                  }}
               />
               <div className={styles.modal_content_block}>
                  <img className={styles.modal_img} src={searchIcon} alt='search-icon' draggable='false' />
                  <p>Напишіть назву тайтлу, щоб знайти його</p>
               </div>
            </SearchModal>
         )}
      </>
   )
})
