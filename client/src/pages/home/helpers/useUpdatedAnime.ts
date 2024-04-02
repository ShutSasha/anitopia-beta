import { useEffect, useState } from 'react'
import { getUpdatedAnime } from '@shared/api/anime/anime'

export type UpdatedAnime = {
   _id: string
   title: string
   last_episode: number
   poster_url: string
}

export const useUpdatedAnime = () => {
   const [updatedAnime, setUpdatedAnime] = useState<UpdatedAnime[]>()

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await getUpdatedAnime()
            setUpdatedAnime(res.data)
         } catch (err) {
            console.error(err)
         }
      }
      fetchData()
   }, [])

   return updatedAnime
}
