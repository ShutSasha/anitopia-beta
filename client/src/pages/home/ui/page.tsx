import { FC, useContext, useEffect, useState } from 'react'
import styles_h from './styles.module.scss'
import { Header } from '../../../widgets/header'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import { Loader, Skeleton } from '../../../shared'
import axios from 'axios'
import 'react-multi-carousel/lib/styles.css'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css' // Default theme
import { PosterSeasonCard } from '../../../entities'

export const HomePage: FC = observer(() => {
   const { store } = useContext(Context)
   const [searchText, setSearchText] = useState<string>('')
   const [animeSeasonData, setAnimeSeasonData] = useState([])

   const headers = {
      Authorization: `Bearer ${localStorage.getItem(`token`)}`,
   }

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(
               'http://localhost:5000/api/anime/season-anime',
            )
            console.log(res.data)
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
      console.log(response)
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
                  <div>
                     {animeSeasonData.length > 0 ? (
                        <Splide
                           options={{
                              type: 'loop',
                              perMove: 2,
                              perPage: 6,
                              pagination: false,
                           }}
                        >
                           {animeSeasonData &&
                              animeSeasonData.map(
                                 (card: any, index: number) => (
                                    <SplideSlide key={index}>
                                       <PosterSeasonCard
                                          id={card.id}
                                          title={card.title}
                                          poster_url={
                                             card.material_data.poster_url
                                          }
                                       />
                                    </SplideSlide>
                                 ),
                              )}
                        </Splide>
                     ) : (
                        <Skeleton width={1320} height={344} />
                     )}
                  </div>
                  {store.isAuth && <div>-_----_----_-----_---</div>}
                  <button onClick={() => getUsersClick()}>get users</button>
               </div>
            </div>
         </div>
      </>
   )
})
