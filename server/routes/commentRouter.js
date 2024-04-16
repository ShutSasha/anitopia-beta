const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:id', commentController.getCommentByid)
router.get('/anime/:id', commentController.getCommentsByAnimeId)
router.post('/', authMiddleware, commentController.createComment)
router.patch('/', authMiddleware, commentController.editComment)
router.delete('/', authMiddleware, commentController.deleteComment)

module.exports = router
