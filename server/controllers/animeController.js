const { default: axios } = require('axios')
const AnimeService = require('../services/AnimeService')
const Anime = require('../models/Anime')
const { getAnimeData } = require('../animeData')
const { parseISO, subDays } = require('date-fns')

class AnimeController {
   async search(req, res, next) {
      try {
         const { query } = req.query
         const data = getAnimeData()

         let filteredData = data.filter((anime) => anime.title.toLowerCase().includes(query.toLowerCase()))

         filteredData = AnimeService.sortByRating(filteredData)

         let startIndex = 0

         // if (req.query.page >= 2) {
         //    startIndex = (req.query.page - 1) * req.query.limit || 0
         // }

         const count = req.query.limit * req.query.page || 20
         const result = AnimeService.getAnimeSubset(filteredData, Number(startIndex), Number(count))

         return res.json({
            data: result,
            length: filteredData.length,
         })
      } catch (e) {
         next(e)
      }
   }

   async getList(req, res, next) {
      try {
         const { query } = req.query
         const data = getAnimeData()

         let sortedData = AnimeService.sortByRating(data)

         if (query) {
            sortedData = sortedData.filter((anime) => anime.title.toLowerCase().includes(query.toLowerCase()))
         }

         let startIndex = 0

         if (req.query.page >= 2) {
            startIndex = (req.query.page - 1) * req.query.limit || 0
         }

         const count = req.query.limit || 10
         const result = AnimeService.getAnimeSubset(sortedData, Number(startIndex), Number(count))

         return res.json({
            data: result,
            length: sortedData.length,
         })
      } catch (e) {
         next(e)
      }
   }

   async getTop(req, res, next) {
      try {
         const data = getAnimeData()
         let sortedData = AnimeService.sortByRating(data)

         return res.json(sortedData.slice(0, 100))
      } catch (error) {
         next(error)
      }
   }

   async getSeason(req, res, next) {
      try {
         const animeWithDate = []
         const currentDate = new Date()
         const currentYear = currentDate.getFullYear()
         const data = getAnimeData()

         await Promise.all(
            data.map(async (item) => {
               if (
                  item.material_data &&
                  item.material_data.aired_at &&
                  item.material_data.shikimori_rating >= 7.5 &&
                  Number(item.material_data.aired_at.split('-')[0]) === Number(currentYear)
               ) {
                  animeWithDate.push({
                     id: item.id,
                     title: item.title,
                     poster_url: item.material_data.poster_url,
                  })
               }
            }),
         )

         return res.json(animeWithDate)
      } catch (error) {
         next(error)
      }
   }

   async getAnimeById(req, res, next) {
      try {
         const { id } = req.params

         const anime = await Anime.findById(id)

         return res.json(anime)
      } catch (error) {}
   }

   async getAllAnime(req, res, next) {
      try {
         let newArray = []
         let nextUrl = `https://kodikapi.com/list?token=${process.env.KODIK_TOKEN}&types=anime-serial&limit=100&with_material_data=true`

         while (nextUrl) {
            let response = await axios.get(nextUrl)
            newArray.push(...response.data.results)

            nextUrl = response.data.next_page
               ? `https://kodikapi.com/list?token=${process.env.KODIK_TOKEN}&types=anime-serial&
               limit=100&with_material_data=true&next=${response.data.next_page}`
               : null

            if (nextUrl === null) {
               break
            }
         }

         const uniqueData = AnimeService.removeDuplicates(newArray, 'shikimori_id')

         uniqueData.forEach((anime) => {
            anime.title = AnimeService.replaceSpecificNames(anime.title)
         })

         const year = new Date().getFullYear()

         for (const animeData of uniqueData) {
            try {
               if (animeData.material_data?.anime_status === 'ongoing' || year === animeData.year) {
                  const existingAnime = await Anime.findOne({ shikimori_id: animeData.shikimori_id })
                  if (existingAnime) {
                     await Anime.updateOne({ id: animeData.id }, animeData)
                  } else {
                     const anime = new Anime(animeData)
                     await anime.save()
                  }
               }
            } catch (error) {
               console.error('Error saving anime:', error)
            }
         }

         return res.json(uniqueData)
      } catch (error) {
         console.error('Error fetching anime data:', error)
         return res.status(500).json({ error: 'An error occurred while fetching anime data' })
      }
   }

   async getUpdated(req, res, next) {
      try {
         const allAnime = getAnimeData()
         let updatedAnimeOfThisWeek = AnimeService.getUpdatedAnime(allAnime)

         return res.status(200).json(updatedAnimeOfThisWeek)
      } catch (e) {
         next(e)
      }
   }

   async getReleasedHalfYear(req, res, next) {
      try {
         const allAnime = getAnimeData()
         let releasedAnimeHalfYear = AnimeService.getReleasedHalfYear(allAnime)

         return res.status(200).json(releasedAnimeHalfYear)
      } catch (e) {
         next(e)
      }
   }

   async getRandom(req, res, next) {
      try {
         const CountAnime = await AnimeService.getCountAnime()

         const randomIndex = Math.floor(Math.random() * CountAnime)

         const randomAnime = await Anime.findOne().skip(randomIndex) // пропускаєм випадкову кількість документів

         return res.status(200).json(randomAnime)
      } catch (e) {
         next(e)
      }
   }
}

module.exports = new AnimeController()
