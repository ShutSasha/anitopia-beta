const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

/**
 * @openapi
 * tags:
 *   - name: comments
 *     description: API для управління коментарями
 */

/**
 * @openapi
 * /api/comments/{id}:
 *  get:
 *     tags:
 *       - comments
 *     summary: Отримати comment за його ObjectId
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 66103cf9eb7df4f27c9d08cb
 *         description: Id коментаря в ObjectId
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано коментарь за ObjectId коментаря.
 */
router.get('/:id', commentController.getCommentByid)

/**
 * @openapi
 * /api/comments/anime/{id}:
 *  get:
 *     tags:
 *       - comments
 *     summary: Отримати comments за ObjectId аніме
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 660b05af81e73a09ac58fcaa
 *         description: Id аніме в ObjectId
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано всі коментарі за ObjectId аніме.
 */
router.get('/anime/:id', commentController.getCommentsByAnimeId)

/**
 * @openapi
 * /api/comments/:
 *   post:
 *     tags:
 *       - comments
 *     summary: Створення коментаря до аніме
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - animeId
 *               - userId
 *               - commentText
 *             properties:
 *               animeId:
 *                 type: string
 *                 example: 660b05af81e73a09ac58fcaa
 *               userId:
 *                 type: string
 *                 example: 65bcbf24435e41c9de91745c
 *               commentText:
 *                 type: string
 *                 example: Wow! Amazing anime
 *     responses:
 *       201:
 *         description: Успішна відповідь. Коментар створено.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d0fe4f5311236168a109ca
 *                 user:
 *                   type: string
 *                   example: 65bcbf24435e41c9de91745c
 *                 anime:
 *                   type: string
 *                   example: 660b05af81e73a09ac58fcaa
 *                 comment_text:
 *                   type: string
 *                   example: Wow! Amazing anime
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2021-06-23T18:25:43.511Z
 *       400:
 *         description: Помилка при валідації введених даних.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Неправильні дані. Перевірте введені дані і спробуйте ще раз.
 *       403:
 *         description: Акаунт не активований.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: У вас не активований аккаунт!
 *       404:
 *         description: Аніме не знайдено.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Anime not found
 *       500:
 *         description: Внутрішня помилка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while creating comment
 */

router.post('/', authMiddleware, commentController.createComment)
router.patch('/', authMiddleware, commentController.editComment)
router.delete('/', authMiddleware, commentController.deleteComment)
router.get('/like/:id', commentController.getLikes)
router.get('/dislike/:id', commentController.getDislikes)
router.patch('/like', authMiddleware, commentController.likeComment)
router.patch('/dislike', authMiddleware, commentController.dislikeComment)

module.exports = router
