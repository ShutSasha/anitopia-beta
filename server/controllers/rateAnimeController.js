const anime_serials = require('../anime-serial.json')
const AnimeRating = require('../models/AnimeRating')
const User = require('../models/User')

class rateAnimeController {
   async makeRateAnime(req, res, next) {
      try {
         const { rate, anime_id, user_id } = req.body

         const user = await User.findById(user_id)

         const existingRatingIndex = user.animeRatings.findIndex(
            (item) => item.animeId === anime_id,
         )

         if (existingRatingIndex !== -1) {
            user.animeRatings[existingRatingIndex].rating = rate
            user.markModified('animeRatings')
         } else {
            const animeRating = new AnimeRating({
               animeId: anime_id,
               rating: rate,
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
