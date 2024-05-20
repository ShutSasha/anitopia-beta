export type GetUserById = {
   id: string | undefined
}

export type EditUserPersonalInfo = {
   id: string | undefined
   firstName: string
   lastName: string
   country: string
   sex: string
   age: number | string
}

export type UserByIdResponse = {
   _id: string
   activationLink: string
   age: number | null
   // animeRatings: AnimeRating[]
   avatarLink: string
   country: string | null
   email: string
   firstName: string | null
   isActivated: boolean
   lastName: string | null
   registrationDate: string
   roles: string[]
   sex: string | null
   uploadStatus: boolean
   username: string
}

export type ChangePasswordResponse = {
   id: string
   oldPassword: string
   newPassword: string
}
