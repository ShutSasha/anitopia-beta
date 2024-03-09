const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:animeId', commentController.getCommentsByAnimeId)
router.post('/', authMiddleware, commentController.createComment)
router.delete('/', authMiddleware, commentController.deleteComment)

module.exports = router
