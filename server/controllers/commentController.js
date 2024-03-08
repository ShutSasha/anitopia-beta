const Comment = require('../models/Comment')
const Anime = require('../models/Anime')
const { ObjectId } = require('mongodb')

class commentController {
   async getCommentsByAnimeId(req, res, next) {
      try {
         const { animeId } = req.params

         const anime = await Anime.findOne({ id: animeId })

         const comments = await Comment.find({ anime: anime._id })

         return res.json(comments)
      } catch (error) {
         console.error('Error fetching comments:', error)
         return res.status(500).json({ error: 'An error occurred while fetching comments' })
      }
   }

   async createComment(req, res, next) {
      try {
         const { animeId, userId, commentText } = req.body

         const animeExists = await Anime.exists({ id: animeId })
         if (!animeExists) {
            return res.status(404).json({ error: 'Anime not found' })
         }

         const anime = await Anime.findOne({ id: animeId })
         const user = new ObjectId(userId)

         const newComment = new Comment({
            anime: anime._id,
            user: user,
            comment_text: commentText,
         })

         await newComment.save()

         anime.comments.push(newComment._id)
         await anime.save()

         return res.status(201).json(newComment)
      } catch (error) {
         console.error('Error creating comment:', error)
         return res.status(500).json({ error: 'An error occurred while creating comment' })
      }
   }
}

module.exports = new commentController()
