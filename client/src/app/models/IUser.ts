export interface IUser {
   username: string
   isActivated: boolean
   id: string
   avatarLink: string
   registrationDate: Date
   firstName: string | null
   lastName: string | null
   country: string | null
   sex: string | null
   age: number | null
   animeRatings: AnimeRatings[]
}

interface AnimeRatings {
   rating: number
   animeId: string
}
