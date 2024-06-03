const News = require('../models/News')
const ApiError = require('../errors/apiError')

class NewsController {
   async add(req, res, next) {
      try {
         const { user, title, type, images, description } = req.body

         const news = new News({
            user,
            title,
            type,
            images,
            description,
         })

         await news.save()
         return res.status(201).json(news)
      } catch (e) {
         next(e)
      }
   }

   async delete(req, res, next) {
      try {
         const { id } = req.params

         const news = await News.findById(id)
         if (!news) {
            return res.status(404).json({ message: 'Новина не знайдена' })
         }

         await News.findByIdAndDelete(id)
         return res.status(200).json({ message: 'Новина видалена' })
      } catch (e) {
         next(e)
      }
   }

   async getNewsById(req, res, next) {
      try {
         const { id } = req.params

         const news = await News.findById(id).populate('user')
         if (!news) {
            return res.status(404).json({ message: 'Новаина не знайдена' })
         }
         return res.status(200).json(news)
      } catch (e) {
         next(e)
      }
   }
}

module.exports = new NewsController()
