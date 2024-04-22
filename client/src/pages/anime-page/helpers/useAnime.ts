import { useEffect, useState } from 'react'
import { Rating } from '../ui/anime-page'
import { useStore } from '@app/hooks/useStore'
import { arraySetRatings, objSetAnimeState } from '../../random-anime/helpers/objectsFetchAnime'
import { useParams } from 'react-router-dom'
import { AnimeApi } from '@shared/api'
import { Anime } from '@shared/api'
import { handleFetchError } from '@app/helpers/functions'

export const useAnime = () => {
   const [anime, setAnime] = useState<Anime>()
   const [ratings, setRatings] = useState<Rating[]>()
   const { store } = useStore()
   const { id } = useParams()

   useEffect(() => {
      const getAnime = async () => {
         try {
            store.setLoading(true)

            const res = await AnimeApi.anime.getAnimeById({ id })

            setAnime(objSetAnimeState(res))
            setRatings(arraySetRatings(res))
         } catch (e) {
            handleFetchError(e)
         } finally {
            store.setLoading(false)
         }
      }
      getAnime()
   }, [id])

   return { anime, ratings }
}
