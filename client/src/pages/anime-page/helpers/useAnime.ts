import { useContext, useEffect, useState } from 'react'
import { Rating } from '../ui/anime-page'
import { Context } from '../../../main'
import { arraySetRatings, objSetAnimeState } from '../../random-anime/helpers/objectsFetchAnime'
import { useParams } from 'react-router-dom'
import { AnimeApi } from '@shared/api'
import { Anime } from '@shared/api'

export const useAnime = () => {
   const [anime, setAnime] = useState<Anime>()
   const [ratings, setRatings] = useState<Rating[]>()
   const { store } = useContext(Context)
   const { id } = useParams()

   useEffect(() => {
      const getAnime = async () => {
         try {
            store.setLoading(true)

            const res = await AnimeApi.anime.getAnimeById({ id })

            setAnime(objSetAnimeState(res))
            setRatings(arraySetRatings(res))
         } catch (error) {
            console.error(error)
         } finally {
            store.setLoading(false)
         }
      }
      getAnime()
   }, [])

   return { anime, ratings }
}
