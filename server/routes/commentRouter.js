const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddlewate = require('../middleware/authMiddleware')

router.get('/:animeId', authMiddlewate, commentController.getCommentsByAnimeId)
router.post('/', authMiddlewate, commentController.createComment)

module.exports = router
