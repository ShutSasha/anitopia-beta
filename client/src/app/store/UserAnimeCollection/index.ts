import { makeAutoObservable } from 'mobx'

export default class UserAnimeCollection {
   collectionType = 'rate'

   constructor() {
      makeAutoObservable(this)
      this.setCollectionType = this.setCollectionType.bind(this)
   }

   setCollectionType(collectionType: string) {
      this.collectionType = collectionType
   }
}
