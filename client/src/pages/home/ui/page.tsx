import { FC, useContext, useState } from 'react'
import styles_h from './styles.module.scss'
import { Header } from '../../../widgets/header'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import { Loader } from '../../../shared'
import { Splider } from '../../../widgets/splider'
import { useFetchAnimeSeasin } from '../helpers/fetchAnimeSeason'

export interface AnimeSeason {
   id: string
   title: string
   poster_url: string
}

export const HomePage: FC = observer(() => {
   const { store } = useContext(Context)
   const [searchText, setSearchText] = useState<string>('')
   const animeSeasonData = useFetchAnimeSeasin()

   if (store.isLoading) {
      return <Loader />
   }

   return (
      <>
         <Header />
         <div className={styles_h.wrapper}>
            <div className={styles_h.container}>
               <div className={styles_h.search_filter_line}>
                  <div className={styles_h.search}>
                     <input
                        className={styles_h.search_input}
                        placeholder='ЗНАЙТИ АІНМЕ ЗА НАЗВОЮ'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        type='text'
                     />
                  </div>
                  <div className={styles_h.filter}>
                     <button className={styles_h.filter_btn}>
                        <span className={styles_h.filter_icon}></span>
                        РОЗКРИТИ ФІЛЬТР
                     </button>
                  </div>
               </div>
               <div className={styles_h.cards_anime_container}>
                  <div className={styles_h.anime_season_block}>
                     <h2 className={styles_h.anime_season_title}>Аніме зимового сезона</h2>
                  </div>
                  <Splider animeSeasonData={animeSeasonData} />
               </div>
            </div>
         </div>
      </>
   )
})
