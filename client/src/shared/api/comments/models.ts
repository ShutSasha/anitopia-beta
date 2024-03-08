export type GetCommentsByAnimeId = {
   id: string | undefined
}

export type GetUserComment = {
   id: string | undefined
}

export type CreateComment = {
   animeId: string | undefined
   userId: string
   commentText: string
}

export type Comment = {
   anime: string
   comment_text: string
   timestamp: string
   user: string
   __v: number
   _id: string
}

export type UserComment = {
   username: string
   avatarLink: string
}
