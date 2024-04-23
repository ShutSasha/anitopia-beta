import { useEffect, useState } from 'react'
import { Rating } from '../ui/anime-page'
import { useStore } from '@app/hooks/useStore'
import { useParams } from 'react-router-dom'
import { AnimeApi } from '@shared/api'
import { Anime } from '@shared/api'
import { handleFetchError } from '@app/helpers/functions'
import { transformResponseToAnime } from '@shared/lib'
import { transformRatingsToArray } from '@shared/lib/anime/transformRatingsToArray'

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

            setAnime(transformResponseToAnime(res))
            setRatings(transformRatingsToArray(res))
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
