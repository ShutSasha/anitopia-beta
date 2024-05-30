export interface IAnime {
   id: string
   link: string
   posterURL: string
   title: string
   shikimori_id:string
   screenshots: string[]
   type: string
   status: string
   airedEpisodes: number | null
   totalEpisodes: number | null
   minimalAge: number | null
   description: string
   genres: string[]
   year: number
}
