const fs = require('fs')
const path = require('path')
const AnimeService = require('./services/AnimeService')

const DATA_FILE_PATH = path.join(__dirname, 'anime-data-from-db.json')

let allAnime

const loadAnimeData = async () => {
   try {
      if (process.env.NODE_ENV !== 'production' && fs.existsSync(DATA_FILE_PATH)) {
         allAnime = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'))
      } else {
         allAnime = await AnimeService.getAllAnime()

         if (process.env.NODE_ENV !== 'production') {
            fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(allAnime), 'utf-8')
         }
      }
   } catch (err) {
      console.error(err)
   }
}

const getAnimeData = () => allAnime

module.exports = { loadAnimeData, getAnimeData }
