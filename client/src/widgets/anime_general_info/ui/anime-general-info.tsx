import { FC, useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Rating } from '../../../pages/random-anime/ui/random-anime'
import { ImageZoomer, Skeleton } from '../../../shared'
import { AnimeRatingList } from '../../../entities'
import { Modal } from '../../Modal'
import { RATE_STAR_LIST } from '../helpers/rate-star-list'
import { useParams } from 'react-router-dom'
import { Context } from '../../../main'
import $api from '../../../app/http'

interface AnimeGeneralInfoProps {
   anime: {
      link: string
      posterURL: string | undefined
      title: string
      screenshots: string[]
      type: string
      status: string
      airedEpisodes: number | null
      totalEpisodes: number | null
      minimalAge: number | null
      description: string | null
      genres: string[]
      year: number
   }
   ratings: Rating[] | undefined
}

export const AnimeGeneralInfo: FC<AnimeGeneralInfoProps> = ({
   anime,
   ratings,
}) => {
   const { store } = useContext(Context)
   const { id } = useParams()
   const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)
   const [modalActive, setModalActive] = useState<boolean>(false)

   useEffect(() => {
      setIsLoadingImage(true)
      const image = new Image()
      image.src = anime.posterURL || ''
      image.onload = () => {
         setIsLoadingImage(false)
      }
   }, [anime.posterURL])

   const headers = {
      Authorization: `Bearer ${localStorage.getItem(`token`)}`,
   }

   const rateAnimeClick = async (rate: number) => {
      const response = await $api.post(
         '/rate-anime',
         { rate: rate, anime_id: id, user_id: store.user.id },
         { headers },
      )
      console.log(response)
      setModalActive(false)
   }

   return (
      <>
         <div className={styles.anime_general_info}>
            <div className={styles.anime_general_info_container}>
               <div className={styles.anime_poster}>
                  {isLoadingImage ? (
                     <Skeleton width={250} height={350} />
                  ) : (
                     <ImageZoomer>
                        <div className={styles.anime_poster_container}>
                           <img src={anime.posterURL} alt='poster_anime' />
                           <div
                              className={styles.rate_star}
                              onClick={() => setModalActive(true)}
                           />
                        </div>
                     </ImageZoomer>
                  )}
               </div>
               <div className={styles.anime_info_box}>
                  <h2 className={styles.title_anime}>{anime.title}</h2>
                  <hr />
                  <AnimeRatingList ratings={ratings} />
                  <hr />
                  <div className={styles.anime_info}>
                     <ul className={styles.anime_info_list}>
                        <li className={styles.anime_info_item}>
                           <p>Статус:</p>
                           <span>{anime.status}</span>
                        </li>
                        <li className={styles.anime_info_item}>
                           <p>Эпизоды:</p>
                           <span>
                              {anime.airedEpisodes}/
                              {anime.totalEpisodes !== 0
                                 ? anime.totalEpisodes
                                 : '?'}
                           </span>
                        </li>
                        <li className={styles.anime_info_item}>
                           <p>Тип</p>
                           <span>{anime.type}</span>
                        </li>
                        <li className={styles.anime_info_item}>
                           <p>Возрастные ограничения:</p>
                           <span>
                              <div className={styles.minimal_age}>
                                 {anime.minimalAge
                                    ? `${anime.minimalAge}+`
                                    : 'Нет'}
                              </div>
                           </span>
                        </li>
                        <li className={styles.anime_info_item}>
                           <p>Жанры:</p>
                           <div className={styles.anime_genres_container}>
                              <ul className={styles.anime_genres_list}>
                                 {anime.genres
                                    ? anime.genres.map((item, index) => (
                                         <li
                                            className={styles.anime_genre}
                                            key={index}
                                         >{`${item} `}</li>
                                      ))
                                    : 'Не установлены'}
                              </ul>
                           </div>
                        </li>
                        <li className={styles.anime_info_item}>
                           <p>Год выпуска:</p>
                           <span>{anime.year}</span>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className={styles.anime_description}>
               Описание: {anime.description ? anime.description : 'Нет'}
            </div>
         </div>
         <Modal
            active={modalActive}
            setActive={setModalActive}
            headerText={'Оцените аниме'}
         >
            <ul className={styles.rate_star_list}>
               {RATE_STAR_LIST.map((item, index) => (
                  <li
                     key={index}
                     className={styles.rate_star_item}
                     onClick={() => rateAnimeClick(item.rate)}
                  >
                     {item.rate}
                  </li>
               ))}
            </ul>
         </Modal>
      </>
   )
}
