const Anime = require('../models/Anime')
const { startOfWeek, endOfWeek, parseISO, subWeeks, isAfter, isBefore, isEqual } = require('date-fns')

class AnimeService {
   async getCountAnime() {
      try {
         const count = await Anime.countDocuments({})
         return count
      } catch (err) {
         next(err)
      }
   }

   async getAllAnime() {
      try {
         const allAnime = await Anime.find({})
         return allAnime
      } catch (err) {
         next(err)
      }
   }

   getUpdatedAnime(data) {
      let updatedAnimeOfLastThreeWeeks = []

      const threeWeeksAgo = subWeeks(new Date(), 3)
      const startOfThreeWeeksAgo = startOfWeek(threeWeeksAgo, { weekStartsOn: 0 })
      const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 })

      for (let anime of data) {
         if (anime.material_data && anime.material_data.aired_at) {
            const airedAtDate = parseISO(anime.material_data.aired_at)

            if (
               (isAfter(airedAtDate, startOfThreeWeeksAgo) || isEqual(airedAtDate, startOfThreeWeeksAgo)) &&
               (isBefore(airedAtDate, endOfCurrentWeek) || isEqual(airedAtDate, endOfCurrentWeek))
            ) {
               updatedAnimeOfLastThreeWeeks.push({
                  _id: anime._id,
                  title: anime.title,
                  last_episode: anime.last_episode,
                  poster_url: anime.material_data.poster_url,
               })
            }
         }
      }

      return updatedAnimeOfLastThreeWeeks
   }

   getReleasedHalfYear(data) {
      let releasedAnimeLastHalfYear = []

      const sixMonthsAgo = subWeeks(new Date(), 26)

      for (let anime of data) {
         if (anime.material_data && anime.material_data.released_at && anime.material_data.shikimori_rating >= 7.8) {
            const releasedAtDate = parseISO(anime.material_data.released_at)

            if (isAfter(releasedAtDate, sixMonthsAgo) || isEqual(releasedAtDate, sixMonthsAgo)) {
               releasedAnimeLastHalfYear.push({
                  _id: anime._id,
                  title: anime.title,
                  last_episode: anime.last_episode,
                  poster_url: anime.material_data.poster_url,
                  type: anime.type,
               })
            }
         }
      }

      return releasedAnimeLastHalfYear
   }

   getAnimeSubset(data, startIndex, count) {
      const resultData = data.slice(startIndex, startIndex + count)
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

   async sortBy(data, query, order) {
      data.sort((a, b) => {
         const queryA =
            a[query] !== undefined
               ? a[query]
               : (a.material_data && a.material_data[query]) !== undefined
                  ? a.material_data[query]
                  : 0
         const queryB =
            b[query] !== undefined
               ? b[query]
               : (b.material_data && b.material_data[query]) !== undefined
                  ? b.material_data[query]
                  : 0

         if (order.toString() === 'asc') {
            return queryA - queryB
         } else if (order.toString() === 'desc') {
            return queryB - queryA
         } else {
            throw new Error('Invalid order value. Must be "asc" or "desc".')
         }
      })

      return data
   }

   async getFilteredList(data, query, param) {

      const list = param.split(',').map(param => param.trim().toLowerCase())
      const isNumericQuery = list.every(value => !isNaN(value))

      const result = data.filter((anime) => {
         const animeParams = anime.material_data && anime.material_data[query] ? anime.material_data[query] : anime[query]

         if (!animeParams) {
            return false
         }
         if (isNumericQuery) {
            const numericParams = Array.isArray(animeParams) ? animeParams : [animeParams]
            const numericList = list.map(Number)

            if (numericList.length === 2) {
               const [min, max] = numericList
               return numericParams.some(param => param >= min && param <= max)
            }

            return false
         } else {
            const correctParams = Array.isArray(animeParams) ? animeParams.map(g => g.toLowerCase()) : [animeParams.toLowerCase()]

            return list.every((param) => correctParams.includes(param))
         }
      })

      return result
   }

    async filterNumberParams(data, key, start, end) {
      const startValue = parseInt(start, 10)
      const endValue = parseInt(end, 10)

      const result = data.filter(anime => {
         const value = key.includes('year') ? anime.year : anime.episodes_count
         return value >= startValue && value <= endValue
      })

      return result
   }

   findAnime(data, searchText) {
      const lowerCaseSearchText = searchText.trim().toLowerCase()
      const searchedData = data.filter((anime) => {
         return anime?.title.toLowerCase().trim().includes(lowerCaseSearchText)
      })
      return searchedData
   }

   replaceSpecificNames(title) {
      const specificNames = [
         { '[ТВ]': '' },
         { '[ТВ-1]': '' },
         { '[ТВ-2]': ' 2' },
         { '[ТВ-3]': ' 3' },
         { '[ТВ-4]': ' 4' },
         { '[ТВ-5]': ' 5' },
         { '[ТВ-6]': ' 6' },
         { '[ТВ-7]': ' 7' },
         { '[ТВ-8]': ' 8' },
         { '[ТВ-9]': ' 9' },
         { '[ТВ-10]': ' 10' },
         { '[ТВ-11]': ' 11' },
         { '[ТВ-12]': ' 12' },
         { '[ТВ-13]': ' 13' },
         { '[ТВ-14]': ' 14' },
         { '[ТВ, часть 1]': 'сезон 1, часть 1' },
         { '[ТВ-1, часть 1]': 'сезон 1, часть 1' },
         { '[ТВ-1, часть 2]': 'сезон 1, часть 2' },
         { '[ТВ-2, часть 1]': 'сезон 2, часть 1' },
         { '[ТВ-2, часть 2]': 'сезон 2, часть 2' },
         { '[ТВ-3, часть 1]': 'сезон 3, часть 1' },
         { '[ТВ-3, часть 2]': 'сезон 3, часть 2' },
         { '[ТВ-3, часть 3]': 'сезон 3, часть 3' },
      ]

      let replacedTitle = title
      specificNames.forEach((specificName) => {
         const nameToReplace = Object.keys(specificName)[0]
         const replacement = specificName[nameToReplace]
         replacedTitle = replacedTitle.replace(nameToReplace, replacement)
      })
      return replacedTitle
   }
}

module.exports = new AnimeService()
