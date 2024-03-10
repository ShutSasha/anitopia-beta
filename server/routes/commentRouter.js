const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:commentId', commentController.getCommentByid)
router.get('/anime/:animeId', commentController.getCommentsByAnimeId)
router.post('/', authMiddleware, commentController.createComment)
router.patch('/', authMiddleware, commentController.editComment)
router.delete('/', authMiddleware, commentController.deleteComment)

module.exports = router
