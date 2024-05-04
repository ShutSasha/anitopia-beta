const shikimoriLogo = '/images/RatingsIcons/shikimori_logo.png'
const imdbLogo = '/images/RatingsIcons/imdb_logo.png'
const kinopoiskLogo = '/images/RatingsIcons/kinopoisk_logopng.png'

export const transformRatingsToArray = (res: any) => {
   const { imdb_rating, shikimori_rating, kinopoisk_rating } = res.data.material_data

   return [
      {
         rating: imdb_rating,
         logo: imdbLogo,
         height: '35px',
         width: '75px',
      },
      {
         rating: shikimori_rating,
         logo: shikimoriLogo,
         height: '25px',
         width: '25px',
      },
      {
         rating: kinopoisk_rating,
         logo: kinopoiskLogo,
         height: '25px',
         width: '25px',
      },
   ]
}
