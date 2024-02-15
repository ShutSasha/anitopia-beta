const { default: axios } = require('axios')
const animeSerials = require('../anime-serial.json')
const AnimeService = require('../services/AnimeService')
const { format } = require('date-fns')
const { ca } = require('date-fns/locale/ca')
const { resetWatchers } = require('nodemon/lib/monitor/watch')

class AnimeController {
   async getAnimeList(req, res, next) {
      try {
         const data = animeSerials
         const uniqueData = await AnimeService.removeDuplicates(data, 'title')
         let sortedData = AnimeService.sortByRating(uniqueData)
         const query = req.query.search

         if (query) {
            sortedData = await AnimeService.findAnime(sortedData, query)
            sortedData = AnimeService.sortByRating(sortedData)
         }

         const startIndex = req.query.page * req.query.limit || 0
         const count = req.query.limit || 10
         const result = await AnimeService.getAnimeSubset(
            sortedData,
            startIndex,
            count,
         )

         return res.json({
            data: result,
            length: sortedData.length,
         })
      } catch (e) {
         next(e)
      }
   }

   async getTopAnime(req, res, next) {
      try {
         const data = animeSerials
         const uniqueData = await AnimeService.removeDuplicates(data, 'title')
         let sortedData = AnimeService.sortByRating(uniqueData)

         return res.json(sortedData.slice(0, 100))
      } catch (error) {
         next(error)
      }
   }

   async getAnimeSeason(req, res, next) {
      try {
         // const date = new Date();
         //const formattedDate = format(date, "yyyy-MM-dd");

         const animeData = animeSerials
         const sliceData = animeData.slice(0, 100)
         const filterData = await AnimeService.removeDuplicates(
            sliceData,
            'title',
         )

         const animeWithDate = filterData.filter(
            (item) => item.material_data.premiere_world != undefined,
         )

         const seasonAnime = animeWithDate.filter((item) => {
            const premiereYear = Number(
               item.material_data.premiere_world.split('-')[0],
            )
            return premiereYear === 2023
         })

         return res.json(seasonAnime)
      } catch (error) {}
   }

   async getAnime(req, res, next) {
      try {
         const { id } = req.params
         const animeData = animeSerials
         const anime = animeData.find((item) => item.id === id)

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
               ? `https://kodikapi.com/list?token=${process.env.KODIK_TOKEN}&types=anime-serial&limit=100&with_material_data=true&next=${response.data.next_page}`
               : null

            if (nextUrl === null || newArray.length === 200) {
               break
            }
         }

         return res.json(newArray.length)
      } catch (error) {
         console.error('Error fetching anime data:', error)
         return res
            .status(500)
            .json({ error: 'An error occurred while fetching anime data' })
      }
   }

   async searchAnime(req, res, next) {
      try {
         const { title } = req.params
         const data = animeSerials
         const searchedAnime = await AnimeService.findAnime(data, title)
         const uniqueData = await AnimeService.removeDuplicates(searchedAnime)
         console.log('Длинна списка: ' + searchedAnime.length)
         return res.json(searchedAnime)
      } catch (e) {
         next(e)
      }
   }
}

module.exports = new AnimeController()
