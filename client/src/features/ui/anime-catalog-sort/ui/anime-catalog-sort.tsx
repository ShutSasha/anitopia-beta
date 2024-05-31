import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import sort_icon from '../assets/sort-icon.svg'
import arrow_down from '/anime-catalog/arrow-down.svg'
import { ColorRadioButtons } from './radio-buttons'
import { ASC_DESC_RADIO_BUTTONS, SORT_RADIO_BUTTONS } from '../consts/radio-buttons'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'

export const AnimeCatalogSort: FC = observer(() => {
   const { store } = useStore()
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
   const modalRef = useRef<HTMLDivElement>(null)

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
         setIsMenuOpen(false)
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <div className={styles.container}>
         <img className={styles.sort_icon} src={sort_icon} alt='' />
         <p className={styles.text}>Сортувати за:</p>
         <div ref={modalRef} className={styles.popup_container}>
            <img
               className={isMenuOpen ? `${styles.popup_icon} ${styles.open}` : `${styles.popup_icon}`}
               src={arrow_down}
               alt=''
               onClick={toggleMenu}
            />
            <div className={`${styles.menu} ${isMenuOpen ? styles.open_menu : ''}`}>
               <p>Сортувати за:</p>
               <ColorRadioButtons
                  sortValue={store.animeCatalogStore.sortType}
                  setSort={store.animeCatalogStore.setSortType}
                  valueList={SORT_RADIO_BUTTONS}
               />
               <span className={styles.separate_btn} />
               <ColorRadioButtons
                  sortValue={store.animeCatalogStore.sortBy}
                  setSort={store.animeCatalogStore.setSortBy}
                  valueList={ASC_DESC_RADIO_BUTTONS}
               />
            </div>
         </div>
      </div>
   )
})
