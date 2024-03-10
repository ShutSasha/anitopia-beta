import { makeAutoObservable } from 'mobx'
import { Rating } from '../../../pages/random-anime/ui/random-anime'
import { IAnime } from '../../models/IAnime'

export default class AnimePage {
   animeData = {} as IAnime
   ratingForAnime = [] as Rating[]
   inputComment = ''
   editInputComment = ''
   toggleUpdateComments = false

   constructor() {
      makeAutoObservable(this)
      this.setAnime = this.setAnime.bind(this)
      this.setRatingsAnime = this.setRatingsAnime.bind(this)
      this.setInputComment = this.setInputComment.bind(this)
      this.setEditInputComment = this.setEditInputComment.bind(this)
      this.setToggleUpdateComments = this.setToggleUpdateComments.bind(this)
   }

   setAnime(animeData: any) {
      this.animeData = animeData
   }

   setRatingsAnime(ratingData: any) {
      this.ratingForAnime = ratingData
   }

   setInputComment(input: string | null) {
      if (input === null) {
         this.inputComment = ''
      }
      if (input) {
         this.inputComment = input
      }
   }

   setEditInputComment(input: string | null) {
      if (input === null) {
         this.editInputComment = ''
      }
      if (input) {
         this.editInputComment = input
      }
   }

   setToggleUpdateComments() {
      this.toggleUpdateComments = !this.toggleUpdateComments
   }
}
