import { MaterialData } from "pages/anime-list/ui/anime-list"

export const convertPosterLinkToImageLink = (material_data: MaterialData, posterLink: string): string => {
   if (!posterLink) {
      return material_data.poster_url!
   }

   const url = new URL(posterLink)
   const id: string = url.searchParams.get('id') ?? ''
   const range = Math.ceil(parseInt(id, 10) / 1000) * 1000

   const image_link = `http://www.world-art.ru/animation/img/${range}/${id}/1.jpg`

   return image_link
}
