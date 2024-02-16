const { logger } = require('sequelize/lib/utils/logger')

class AnimeService {
   async getAnimeSubset(data, startIndex, count) {
      console.log(startIndex, count)
      const resultData = data.slice(startIndex, startIndex + count)
      console.log('Result:', resultData)
      return resultData
   }

   removeDuplicates(array, key) {
      const uniqueAnime = new Set()
      return array.filter((obj) => {
         if (!uniqueAnime.has(obj[key])) {
            uniqueAnime.add(obj[key])
            return true
         }
         return false
      })
   }

   sortByRating(data) {
      data.sort((a, b) => {
         const ratingA = a?.material_data?.shikimori_rating ?? 0
         const ratingB = b?.material_data?.shikimori_rating ?? 0

         return ratingB - ratingA
      })

      return data
   }

   findAnime(data, searchText) {
      const lowerCaseSearchText = searchText.trim().toLowerCase()
      const searchedData = data.filter((anime) => {
         return anime?.title.toLowerCase().trim().includes(lowerCaseSearchText)
      })
      return searchedData
   }
}

module.exports = new AnimeService()
