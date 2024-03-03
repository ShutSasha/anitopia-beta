import { useEffect, useState } from 'react'
import { AnimeSeason } from '../ui/page'
import axios from 'axios'

export const useFetchAnimeSeasin = () => {
   const [animeSeasonData, setAnimeSeasonData] = useState<AnimeSeason[]>([])

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

   return animeSeasonData
}
