const AnimeService = require("./services/AnimeService")

let allAnime

const loadAnimeData = async () => {
   try {
      allAnime = await AnimeService.getAllAnime()
   } catch (err) {
      console.error(err)
   }
}

const getAnimeData = () => allAnime

module.exports = { loadAnimeData, getAnimeData }
