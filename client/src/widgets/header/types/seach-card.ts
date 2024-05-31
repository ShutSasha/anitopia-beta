export interface ISearchCard {
   id: number
   title: string
   title_orig: string
   shikimori_id: string
   material_data: {
      anime_status: string
      anime_kind: string
      poster_url: string
   }
   year: string
}
