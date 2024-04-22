import { makeAutoObservable } from 'mobx'
import { IAnime } from '../../models/IAnime'
import { Rating } from 'pages/anime-page/ui/anime-page'

export default class RandomAnime {
   animeRandomData = {} as IAnime
   ratingForRandomAnime = [] as Rating[]

   constructor() {
      makeAutoObservable(this)
      this.setRandomAnime = this.setRandomAnime.bind(this)
      this.setRatingForRandomAnime = this.setRatingForRandomAnime.bind(this)
   }

   setRandomAnime(animeData: any) {
      this.animeRandomData = animeData
   }

   setRatingForRandomAnime(ratingData: any) {
      this.ratingForRandomAnime = ratingData
   }

   randomAnimeClick(fucntionClick: () => void) {
      fucntionClick()
   }
}
