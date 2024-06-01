const Comment = require('../models/Comment')
const Anime = require('../models/Anime')
const User = require('../models/User')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

class commentController {
   async getCommentByid(req, res, next) {
      try {
         const { id } = req.params

         const comment = await Comment.findById(id)

         return res.status(200).json(comment)
      } catch (e) {
         next(e)
      }
   }

   async getCommentsByAnimeId(req, res, next) {
      try {
         const { id } = req.params

         const anime = await Anime.findById(id).populate({
            path: 'comments',
            populate: {
               path: 'user',
               model: 'User',
            },
         })

         return res.status(200).json(anime.comments)
      } catch (error) {
         console.error('Error fetching comments:', error)
         return res.status(500).json({ error: 'An error occurred while fetching comments' })
      }
   }

   async createComment(req, res, next) {
      try {
         const { animeId, userId, commentText } = req.body

         const anime = await Anime.findById(animeId)
         if (!anime) {
            return res.status(404).json({ error: 'Anime not found' })
         }

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

   async editComment(req, res, next) {
      try {
         const { comment_id, new_comment_text } = req.body

         const comment = await Comment.findById(comment_id)

         if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })
         }

         comment.comment_text = new_comment_text
         await comment.save()

         return res.status(200).json({ comment: comment.toObject() })
      } catch (error) {
         console.error(error)
      }
   }

   async deleteComment(req, res, next) {
      try {
         const { commentId, animeId } = req.query

         const anime = await Anime.findById(animeId)
         if (!anime) {
            return res.status(404).json({ error: 'Anime not found' })
         }

         const deletedComment = await Comment.deleteOne({ _id: commentId })
         if (deletedComment.deletedCount === 0) {
            return res.status(404).json({ error: 'Comment not found' })
         }

         anime.comments = anime.comments.filter((item) => item.toString() !== commentId)

         await anime.save()

         return res.status(200).json({ message: 'Comment deleted successfully' })
      } catch (error) {
         console.error('Error delete comment:', error)
         return res.status(500).json({ error: 'An error occurred while delete comment' })
      }
   }

   async getLikes(req, res, next) {
      try {
         const { id } = req.params

         const comment = await Comment.findById(id)

         return res.status(200).json({ likes: comment.likes })
      } catch (error) {
         next(error)
      }
   }

   async getDislikes(req, res, next) {
      try {
         const { id } = req.params

         const comment = await Comment.findById(id)

         return res.status(200).json({ dislikes: comment.dislikes })
      } catch (error) {
         next(error)
      }
   }

   async likeComment(req, res, next) {
      const session = await mongoose.startSession()
      session.startTransaction()
      try {
         const { commentId, userId } = req.body

         const comment = await Comment.findById(commentId).session(session)
         const user = await User.findById(userId).session(session)

         if (!comment) {
            await session.abortTransaction()
            return res.status(404).json({ message: 'Comment not found' })
         }

         if (!user) {
            await session.abortTransaction()
            return res.status(404).json({ message: 'User not found' })
         }

         if (comment.likesBy.includes(user._id)) {
            comment.likesBy = comment.likesBy.filter((item) => item.toString() !== user._id.toString())
            comment.likes -= 1
         } else {
            comment.likesBy.push(user._id)
            comment.likes += 1
            if (comment.dislikesBy.includes(user._id)) {
               comment.dislikesBy = comment.dislikesBy.filter((item) => item.toString() !== user._id.toString())
               comment.dislikes -= 1
            }
         }

         await comment.save({ session })

         await session.commitTransaction()
         session.endSession()

         return res.status(200).json({ likes: comment.likes })
      } catch (error) {
         await session.abortTransaction()
         session.endSession()
         next(error)
      }
   }

   async dislikeComment(req, res, next) {
      const session = await mongoose.startSession()
      session.startTransaction()
      try {
         const { commentId, userId } = req.body

         const comment = await Comment.findById(commentId).session(session)
         const user = await User.findById(userId).session(session)

         if (!comment) {
            await session.abortTransaction()
            return res.status(404).json({ message: 'Comment not found' })
         }

         if (!user) {
            await session.abortTransaction()
            return res.status(404).json({ message: 'User not found' })
         }

         if (comment.dislikesBy.includes(user._id)) {
            comment.dislikesBy = comment.dislikesBy.filter((item) => item.toString() !== user._id.toString())
            comment.dislikes -= 1
         } else {
            comment.dislikesBy.push(user._id)
            comment.dislikes += 1
            if (comment.likesBy.includes(user._id)) {
               comment.likesBy = comment.likesBy.filter((item) => item.toString() !== user._id.toString())
               comment.likes -= 1
            }
         }

         await comment.save({ session })

         await session.commitTransaction()
         session.endSession()

         return res.status(200).json({ dislikes: comment.dislikes })
      } catch (error) {
         await session.abortTransaction()
         session.endSession()
         next(error)
      }
   }
}

module.exports = new commentController()
