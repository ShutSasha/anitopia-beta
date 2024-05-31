export const formattedAnimeData = (response: any) => {
   try {
      return response.data.map((anime: any) => ({
         title: anime.title,
         title_orig: anime.title_orig,
         type: anime.type,
         id: anime._id,
         shikimori_id: anime.shikimori_id,
         material_data: anime.material_data
            ? {
               description: anime.material_data.description ? anime.material_data.description : 'Нет',
               poster_url: anime.material_data.poster_url,
               genres: anime.material_data.anime_genres,
               anime_kind: anime.material_data.anime_kind,
               anime_status: anime.material_data.anime_status,
               rating: anime.material_data.shikimori_rating,
            }
            : {
               description: 'Нет',
               poster_url: '',
               genres: [],
               rating: 0,
            },
         year: anime.year,
         worldart_link: anime.worldart_link,
      }))
   } catch (e) {
      console.error('An error occured to get anime list')
   }
}
