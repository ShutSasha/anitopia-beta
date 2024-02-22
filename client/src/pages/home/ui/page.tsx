import { FC, useContext, useEffect, useState } from 'react'
import styles_h from './styles.module.scss'
import { Header } from '../../../widgets/header'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import { Loader } from '../../../shared'
import axios from 'axios'
import { Splider } from '../../../widgets/splider'

export interface AnimeSeason {
   id: string
   title: string
   poster_url: string
}

export const HomePage: FC = observer(() => {
   const { store } = useContext(Context)
   const [searchText, setSearchText] = useState<string>('')
   const [animeSeasonData, setAnimeSeasonData] = useState<AnimeSeason[]>([])

   const headers = {
      Authorization: `Bearer ${localStorage.getItem(`token`)}`,
   }

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get<AnimeSeason[]>(
               'http://localhost:5000/api/anime/season-anime',
            )
            setAnimeSeasonData(res.data)
         } catch (err) {
            console.error(err)
         }
      }
      fetchData()
   }, [])

   const getUsersClick = async () => {
      const response = await axios.get('http://localhost:5000/api/auth/users', {
         headers,
      })
   }

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
                        placeholder='НАЙТИ АНИМЕ ПО НАЗВАНИЮ'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        type='text'
                     />
                  </div>
                  <div className={styles_h.filter}>
                     <button className={styles_h.filter_btn}>
                        <span className={styles_h.filter_icon}></span>
                        РАСКРЫТЬ ФИЛЬТР
                     </button>
                  </div>
               </div>
               <div className={styles_h.cards_anime_container}>
                  <div className={styles_h.anime_season_block}>
                     <h2 className={styles_h.anime_season_title}>
                        Аниме зимнего сезона
                     </h2>
                  </div>
                  <Splider animeSeasonData={animeSeasonData} />
                  {store.isAuth && <div>-_----_----_-----_---</div>}
                  <button onClick={getUsersClick}>get users</button>
               </div>
            </div>
         </div>
      </>
   )
})
