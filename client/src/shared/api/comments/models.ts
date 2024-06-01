export type GetCommentById = {
   id: string
}

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

export type EditComment = {
   comment_id: string
   new_comment_text: string
}

export type DeleteComment = {
   commentId: string
   animeId: string
}

export type Comment = {
   anime: string
   comment_text: string
   timestamp: string
   user: {
      _id: string
   }
   __v: number
   _id: string
}

export type UserComment = {
   username: string
   avatarLink: string
}
