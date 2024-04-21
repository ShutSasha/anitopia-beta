import { makeAutoObservable } from 'mobx'
import { Anime } from 'pages/anime-list/ui/anime-list'

export default class AnimeCatalogStore {
   catalogAnimeData = [] as Anime[]
   totalLength = 0

   constructor() {
      makeAutoObservable(this)
   }

   setCatalog(animeData: Anime[]) {
      this.catalogAnimeData = animeData
   }

   setTotalLength(length: number) {
      this.totalLength = length
   }
}
