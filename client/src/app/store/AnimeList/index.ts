import { makeAutoObservable } from 'mobx'
import { Anime } from 'pages/anime-list/ui/anime-list'

export default class AnimeCatalogStore {
   catalogAnimeData = [] as Anime[]
   sortType = ''
   sortBy = ''
   genres = ''
   kinds = ''
   mpaa = ''
   year_start = ''
   year_end = ''
   episodes_start = ''
   episodes_end = ''
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

   setGenres(genres: string[]) {
      this.genres = genres.join(',')
   }

   setKind(kinds: string[]) {
      this.kinds = kinds.join(',')
   }

   setMPAA(mpaa: string[]) {
      this.mpaa = mpaa.join(',')
   }

   setYearStart(year: string) {
      this.year_start = year
   }

   setYearEnd(year: string) {
      this.year_end = year
   }

   setEpisodesStart(episodes: string) {
      this.episodes_start = episodes
   }

   setEpisodesEnd(episodes: string) {
      this.episodes_end = episodes
   }
}
