import { useEffect, useState } from 'react'
import { getReleasedAnimeLastMonth } from '@shared/api/anime/anime'

export type ReleasedAnime = {
   _id: string
   title: string
   last_episode: number
   poster_url: string
   type: string
}

export const useReleasedAnimeLastMonth = () => {
   const [releasedAnime, setReleasedAnime] = useState<ReleasedAnime[]>()

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await getReleasedAnimeLastMonth()
            setReleasedAnime(res.data)
         } catch (err) {
            console.error(err)
         }
      }
      fetchData()
   }, [])

   return releasedAnime
}
