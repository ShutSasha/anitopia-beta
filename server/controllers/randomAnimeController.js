const ApiError = require('../errors/apiError')
const AnimeService = require('../services/AnimeService')
const Anime = require('../models/Anime')
class randomAnimeController {
   async getRandomAnime(req, res, next) {
      try {
         const CountAnime = await AnimeService.getCountAnime()

         const randomIndex = Math.floor(Math.random() * CountAnime)

         const randomAnime = await Anime.findOne().skip(randomIndex) // пропускаєм випадкову кількість документів

         return res.json(randomAnime)
      } catch (e) {
         console.error(e)
         next(e)
      }
   }
}

module.exports = new randomAnimeController()
