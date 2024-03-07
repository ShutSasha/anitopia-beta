const { default: axios } = require('axios')
const animeSerials = require('../animeFilterData.json')
const AnimeService = require('../services/AnimeService')
const { format } = require('date-fns')
const { ca } = require('date-fns/locale/ca')
const { resetWatchers } = require('nodemon/lib/monitor/watch')
const fs = require('fs')
const path = require('path')
const Anime = require('../models/Anime')
class AnimeController {
   async getAnimeList(req, res, next) {
      try {
         const data = animeSerials
         let sortedData = AnimeService.sortByRating(data)
         const query = req.query.search

         if (query) {
            sortedData = await AnimeService.findAnime(data, query)
            sortedData = AnimeService.sortByRating(sortedData)
         }

         let startIndex = 0

         if (sortedData.length >= 10) {
            startIndex = req.query.page * req.query.limit || 0
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
         const animeWithDate = []
         const currentDate = new Date()
         const currentYear = currentDate.getFullYear()

         await Promise.all(
            animeSerials.map(async (item) => {
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
               ? `https://kodikapi.com/list?token=${process.env.KODIK_TOKEN}&types=anime-serial&
               limit=100&with_material_data=true&next=${response.data.next_page}`
               : null

            if (nextUrl === null) {
               break
            }
         }

         const uniqueData = await AnimeService.removeDuplicates(newArray, 'title')

         uniqueData.forEach((anime) => {
            anime.title = AnimeService.replaceSpecificNames(anime.title)
         })

         for (const animeData of uniqueData) {
            try {
               const existingAnime = await Anime.findOne({ id: animeData.id })
               if (existingAnime) {
                  await Anime.updateOne({ id: animeData.id }, animeData)
               } else {
                  const anime = new Anime(animeData)
                  await anime.save()
               }
            } catch (error) {
               console.error('Error saving anime:', error)
            }
         }

         const serverDirectory = path.join(__dirname, '../')

         const filePath = path.join(serverDirectory, 'animeFilterData.json')
         fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 3))

         return res.json(uniqueData.length)
      } catch (error) {
         console.error('Error fetching anime data:', error)
         return res.status(500).json({ error: 'An error occurred while fetching anime data' })
      }
   }

   //? is not used
   async searchAnime(req, res, next) {
      try {
         const { title } = req.params
         const data = animeSerials
         const searchedAnime = await AnimeService.findAnime(data, title)
         const uniqueData = await AnimeService.removeDuplicates(searchedAnime)
         return res.json(searchedAnime)
      } catch (e) {
         next(e)
      }
   }
}

module.exports = new AnimeController()
