const Comment = require('../models/Comment')

class commentController {
   async getCommentsByAnimeId(req, res, next) {
      try {
         const { animeId } = req.params

         const comments = await Comment.find({ animeId })

         return res.json(comments)
      } catch (error) {
         console.error('Error fetching comments:', error)
         return res.status(500).json({ error: 'An error occurred while fetching comments' })
      }
   }

   async createComment(req, res, next) {
      try {
         const { animeId, userId, commentText } = req.body

         const newComment = new Comment({
            animeId,
            userId,
            commentText,
         })

         await newComment.save()

         return res.status(201).json(newComment)
      } catch (error) {
         console.error('Error creating comment:', error)
         return res.status(500).json({ error: 'An error occurred while creating comment' })
      }
   }
}

module.exports = new commentController()
