import { useEffect, useState } from 'react'
import { AnimeSeason } from '../ui/page'
import { getAnimeSeason } from '@shared/api/anime/anime'

export const useFetchAnimeSeason = () => {
   const [animeSeasonData, setAnimeSeasonData] = useState<AnimeSeason[]>([])

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await getAnimeSeason()
            setAnimeSeasonData(res.data)
         } catch (err) {
            console.error(err)
         }
      }
      fetchData()
   }, [])

   return animeSeasonData
}
