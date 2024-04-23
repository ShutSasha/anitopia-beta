import { getAnimeById } from '@shared/api/anime/anime'
import { toUrlEncoded } from './to-url-encoded'
import { ANILIB_SEARCH_API } from '../consts/api'
import { checkSuitableAnime } from './check-suitable-anime'
import { Dispatch, SetStateAction } from 'react'
import { AnitopiaServerError } from '@app/helpers/functions'

export const findSuitableAnime = async (id: string | undefined, setPlayerPoster: Dispatch<SetStateAction<string>>) => {
   if (!id) {
      throw new AnitopiaServerError(
         'Аніме з таким ID не знайдено, спробуйте перезавантажити сторінку або звернутися до адміністратора.',
      )
   }

   // finding anime by id from KODIK API
   const animeById = await getAnimeById({ id })

   // setting poster for the player
   if (animeById.data.material_data.screenshots !== undefined) {
      setPlayerPoster(animeById.data.material_data.screenshots[0])
   }

   const AnitopiaAnimeTitle = animeById.data.material_data.anime_title

   // encoding anime title for search, cuz it needs to search in URL
   const encodedUrl = toUrlEncoded(AnitopiaAnimeTitle)

   // searching anime in ANILIB API
   const searchAnime = await fetch(`${ANILIB_SEARCH_API}=${encodedUrl}`)
      .then((res) => res.json())
      .then((res) => res.data)

   const SuitableAnime = checkSuitableAnime(searchAnime, AnitopiaAnimeTitle)
   return SuitableAnime
}
