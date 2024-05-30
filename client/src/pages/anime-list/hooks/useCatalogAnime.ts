import { getCatalogAnime } from '@shared/api/anime/anime'
import { formattedAnimeData } from '../helpers/formattedAnimeData'
import { handleFetchError } from '@app/helpers/functions'
import Store from '@app/store/store'

export const fetchAnimeList = async (currentPage: number, animesPerPage: number, store: Store, searchTerm: string) => {
   try {
      const response = await getCatalogAnime({
         page: currentPage,
         limit: animesPerPage,
         query: searchTerm,
         [store.animeCatalogStore.sortType]: store.animeCatalogStore.sortBy,
         anime_genres: store.animeCatalogStore.genres,
         anime_kind: store.animeCatalogStore.kinds,
         rating_mpaa: store.animeCatalogStore.mpaa,
         year_start: store.animeCatalogStore.year_start,
         year_end: store.animeCatalogStore.year_end,
         episodes_start: store.animeCatalogStore.episodes_start,
         episodes_end: store.animeCatalogStore.episodes_end,
      })

      const formattedData = formattedAnimeData(response.data)
      store.animeCatalogStore.setCatalog(formattedData)
      store.animeCatalogStore.setTotalLength(response.data.length)
   } catch (e) {
      handleFetchError(e)
   }
}
