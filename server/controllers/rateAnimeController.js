const anime_serials = require('../animeFilterData.json')
const AnimeRating = require('../models/AnimeRating')
const User = require('../models/User')

class rateAnimeController {
   async getRatedAnime(req, res, next) {
      try {
         const { id } = req.params

         const user = await User.findById(id)

         let RatedAnime = user.animeRatings.map((item) => {
            return {
               rating: item.rating,
               animeId: item.animeId,
               poster_url: item.poster_url,
               title: item.title,
            }
         })

         return res.json(RatedAnime)
      } catch (error) {
         next(error)
      }
   }

   async makeRateAnime(req, res, next) {
      try {
         const { rate, anime_id, user_id } = req.body

         const user = await User.findById(user_id)

         const existingRatingIndex = user.animeRatings.findIndex(
            (item) => item.animeId === anime_id,
         )

         const anime = anime_serials.find((item) => item.id === anime_id)

         if (existingRatingIndex !== -1) {
            user.animeRatings[existingRatingIndex].rating = rate
            user.markModified('animeRatings')
         } else {
            const animeRating = new AnimeRating({
               animeId: anime_id,
               rating: rate,
               poster_url: anime.material_data.poster_url,
               title: anime.title,
            })
            user.animeRatings.push(animeRating)
         }

         await user.save()

         return res.json({ user })
      } catch (e) {
         next(e)
      }
   }
}

module.exports = new rateAnimeController()