const AnimeRating = require('../models/AnimeRating')
const User = require('../models/User')
const { getAnimeData } = require('../animeData')

class rateAnimeController {
   async getRatedAnime(req, res, next) {
      try {
         const { id } = req.params

         const user = await User.findById(id)

         let RatedAnime = user.animeRatings.map((item) => {
            return {
               rating: item.rating,
               animeId: item.animeId,
               shikimori_id: item.shikimori_id,
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
         const { rate, anime_id, user_id, shikimori_id } = req.body

         const allAnime = getAnimeData()
         const user = await User.findById(user_id)

         if (!user) {
            throw new Error('Користувача не знайдено')
         }

         const existingRatingIndex = user.animeRatings.findIndex((item) => item.animeId === anime_id)

         const anime = allAnime.find((item) => item._id === anime_id)

         if (!anime) {
            throw new Error(`Аніме не знайдено, anime_id: ${anime_id}, anime._id: ${anime._id}`)
         }

         if (existingRatingIndex !== -1) {
            user.animeRatings[existingRatingIndex].rating = rate
            user.animeRatings.shikimori_id = shikimori_id
            user.markModified('animeRatings')
         } else {
            const animeRating = new AnimeRating({
               animeId: anime_id,
               rating: rate,
               shikimori_id: shikimori_id,
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

   async removeAnimeRate(req, res, next) {
      try {
         const { anime_id, user_id } = req.body

         const user = await User.findById(user_id)

         user.animeRatings = user.animeRatings.filter((item) => item.animeId !== anime_id)

         await user.save()

         return res.json({ message: 'success' })
      } catch (error) {
         next(error)
      }
   }
}

module.exports = new rateAnimeController()
