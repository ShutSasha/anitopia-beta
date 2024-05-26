import { makeAutoObservable } from 'mobx'
import { Anime } from 'pages/anime-list/ui/anime-list'

export default class AnimeCatalogStore {
   catalogAnimeData = [] as Anime[]
   sortType = ''
   sortBy = ''
   totalLength = 0

   constructor() {
      makeAutoObservable(this)
      this.setSortType = this.setSortType.bind(this)
      this.setSortBy = this.setSortBy.bind(this)
   }

   setCatalog(animeData: Anime[]) {
      this.catalogAnimeData = animeData
   }

   setTotalLength(length: number) {
      this.totalLength = length
   }

   setSortType(type: string) {
      console.log(type)
      this.sortType = type
   }

   setSortBy(by: string) {
      this.sortBy = by
   }
}
