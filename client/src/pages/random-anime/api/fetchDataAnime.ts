import { arraySetRatings, objSetAnimeState } from '../helpers/objectsFetchAnime'
import $api from '@app/http'

export const fetchAnimeData = async (
   setAnime: any,
   setRatings: any,
   setLoading: (item: boolean) => void,
   id: string | null,
) => {
   setLoading(true)
   try {
      if (id) {
         const res = await $api.get(`/anime/${id}`)

         setAnime(objSetAnimeState(res))
         setRatings(arraySetRatings(res))
      } else {
         const res = await $api.get('/random-anime')

         setAnime(objSetAnimeState(res))
         setRatings(arraySetRatings(res))
      }
   } catch (error) {
      console.error(error)
   } finally {
      setLoading(false)
   }
}

export const handleClickRandomAnime = (
   setAnime: React.Dispatch<React.SetStateAction<any>>,
   setRatings: React.Dispatch<React.SetStateAction<any>>,
   setLoading: (loading: boolean) => void,
   id: string | null,
) => {
   fetchAnimeData(setAnime, setRatings, setLoading, id)
}
