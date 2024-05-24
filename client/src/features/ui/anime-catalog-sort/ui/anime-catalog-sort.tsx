import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import sort_icon from '../assets/sort-icon.svg'
import arrow_down from '../assets/arrow-down.svg'
import { ColorRadioButtons } from './radio-buttons'
import { ASC_DESC_RADIO_BUTTONS, SORT_RADIO_BUTTONS } from '../consts/radio-buttons'

export const AnimeCatalogSort: FC = () => {
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
         <div className={styles.popup_container}>
            <img
               className={isMenuOpen ? `${styles.popup_icon} ${styles.open}` : `${styles.popup_icon}`}
               src={arrow_down}
               alt=''
               onClick={toggleMenu}
            />
            <div ref={modalRef} className={`${styles.menu} ${isMenuOpen ? styles.open_menu : ''}`}>
               <p>Сортувати за:</p>
               <ColorRadioButtons valueList={SORT_RADIO_BUTTONS} />
               <span className={styles.separate_btn} />
               <ColorRadioButtons valueList={ASC_DESC_RADIO_BUTTONS} />
            </div>
         </div>
      </div>
   )
}
