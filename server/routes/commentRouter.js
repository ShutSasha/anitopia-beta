const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:animeId', authMiddleware, commentController.getCommentsByAnimeId)
router.post('/', authMiddleware, commentController.createComment)

module.exports = router
