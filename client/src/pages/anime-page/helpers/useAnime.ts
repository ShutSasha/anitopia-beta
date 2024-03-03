import { useContext, useEffect, useState } from 'react'
import { IAnime } from '../../../app/models/IAnime'
import { Rating } from '../ui/anime-page'
import { Context } from '../../../main'
import {
   arraySetRatings,
   objSetAnimeState,
} from '../../random-anime/helpers/objectsFetchAnime'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const useAnime = () => {
   const [anime, setAnime] = useState<IAnime>()
   const [ratings, setRatings] = useState<Rating[]>()
   const { store } = useContext(Context)
   const { id } = useParams()

   useEffect(() => {
      const getAnime = async () => {
         try {
            store.setLoading(true)

            const res = await axios.get(`http://localhost:5000/api/anime/${id}`)

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
