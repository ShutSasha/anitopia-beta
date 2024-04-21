import { getCatalogAnime } from '@shared/api/anime/anime'
import { formattedAnimeData } from '../helpers/formattedAnimeData'
import { handleFetchError } from '@app/helpers/functions'
import Store from '@app/store/store'

export const fetchAnimeList = async (currentPage: number, animesPerPage: number, store: Store) => {
   try {
      const response = await getCatalogAnime({ page: currentPage, limit: animesPerPage })
      console.log('rerender')
      const formattedData = formattedAnimeData(response.data)
      store.animeCatalogStore.setCatalog(formattedData)
      store.animeCatalogStore.setTotalLength(response.data.length)
   } catch (e) {
      handleFetchError(e)
   }
}
