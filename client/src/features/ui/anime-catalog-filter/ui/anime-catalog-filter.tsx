import { ChangeEvent, FC, useState } from 'react'
import styles from './styles.module.scss'
import filter_icon from '/anime-catalog/filter-icon.png'
import arrow_down from '/anime-catalog/arrow-down.svg'
import { useStore } from '@app/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { Input, Select } from 'antd'
import { GENRES } from '../consts/genres'
import { KINDS } from '../consts/kinds'
import { MPAA } from '../consts/mpaa'
import { toJS } from 'mobx'

export const AnimeCatalogFilter: FC = observer(() => {
   const { store } = useStore()
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
   const { genres, kinds, mpaa } = store.animeCatalogStore

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   const handleChangeGenre = (value: string[]) => {
      store.animeCatalogStore.setGenres(value)
   }

   const handleChangeKind = (value: string[]) => {
      store.animeCatalogStore.setKind(value)
   }

   const handleChangeMPAA = (value: string[]) => {
      store.animeCatalogStore.setMPAA(value)
   }

   const handleChangeYearStart = (e: ChangeEvent<HTMLInputElement>) => {
      store.animeCatalogStore.setYearStart(e.target.value)
   }

   const handleChangeYearEnd = (e: ChangeEvent<HTMLInputElement>) => {
      store.animeCatalogStore.setYearEnd(e.target.value)
   }

   const handleChangeEpisodesStart = (e: ChangeEvent<HTMLInputElement>) => {
      store.animeCatalogStore.setEpisodesStart(e.target.value)
   }

   const handleChangeEpisodesEnd = (e: ChangeEvent<HTMLInputElement>) => {
      store.animeCatalogStore.setEpisodesEnd(e.target.value)
   }

   return (
      <div className={styles.container}>
         <img className={styles.sort_icon} src={filter_icon} alt='' />
         <p className={styles.text}>Фільтрувати за:</p>
         <div className={styles.popup_container}>
            <img
               className={isMenuOpen ? `${styles.popup_icon} ${styles.open}` : `${styles.popup_icon}`}
               src={arrow_down}
               alt=''
               onClick={toggleMenu}
            />
            <div className={`${styles.menu} ${isMenuOpen ? styles.open_menu : ''}`}>
               <p style={{ marginBottom: '10px' }}>Фільтрувати за:</p>
               <Select
                  mode='multiple'
                  size={'middle'}
                  placeholder='Будь ласка, виберіть жанр аніме'
                  defaultValue={genres ? genres.split(',') : []}
                  onChange={handleChangeGenre}
                  style={{
                     width: '300px',
                     marginBottom: '10px',
                  }}
                  options={GENRES}
               />
               <Select
                  mode='multiple'
                  size={'middle'}
                  placeholder='Будь ласка, виберіть тип аніме'
                  defaultValue={kinds ? kinds.split(',') : []}
                  onChange={handleChangeKind}
                  style={{
                     width: '300px',
                     marginBottom: '10px',
                  }}
                  options={KINDS}
               />
               <Select
                  mode='multiple'
                  size={'middle'}
                  placeholder='Виберіть MPAA'
                  defaultValue={mpaa ? mpaa.split(',') : []}
                  onChange={handleChangeMPAA}
                  style={{
                     width: '300px',
                     marginBottom: '10px',
                  }}
                  options={MPAA}
               />
               <p style={{ marginBottom: '10px' }}>Рік</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', marginBottom: '10px' }}>
                  <Input placeholder='Від' onChange={handleChangeYearStart} />
                  <Input placeholder='До' onChange={handleChangeYearEnd} />
               </div>
               <p style={{ marginBottom: '10px' }}>Епізоди</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
                  <Input placeholder='Від' onChange={handleChangeEpisodesStart} />
                  <Input placeholder='До' onChange={handleChangeEpisodesEnd} />
               </div>
            </div>
         </div>
      </div>
   )
})
