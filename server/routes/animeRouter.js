const Router = require('express')
const router = new Router()
const animeController = require('../controllers/animeController')

/**
 * @openapi
 * tags:
 *   - name: anime
 *     description: API для аніме
 * /api/anime:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати всі аніме -  НЕ ЮЗАТИ!!!
 *     description: Перезаписує аніме фільтр дату.
 *     responses:
 *       200:
 *         description: Успішна відповідь. Список всих аніме отримана.
 */
router.get('/', animeController.getAllAnime)

/**
 * @openapi
 * /api/anime/list:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати список аніме
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Отримати список аніме 10 штук (для пагінації)
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано список аніме.
 */
router.get('/list', animeController.getList)

/**
 * @openapi
 * /api/anime/search:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати список аніме за запитом
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *           example: Гинтама
 *         description: Пошук аніме за запитом
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано список аніме за запитом.
 */
router.get('/search', animeController.search)

/**
 * @openapi
 * /api/anime/top:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати топ аніме
 *     description: Отримуєм список топ-100 аніме.
 *     responses:
 *       200:
 *         description: Успішна відповідь.Отримано топ аніме.
 */
router.get('/top', animeController.getTop)

/**
 * @openapi
 * /api/anime/updated:
 *  get:
 *     tags:
 *       - anime
 *     summary: Оновлені аніме
 *     description: Отримати список аніме, де випущений епізод був протягом троьх тижнів.
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано оновлений список аніме.
 */
router.get('/updated', animeController.getUpdated)

/**
 * @openapi
 * /api/anime/released:
 *  get:
 *     tags:
 *       - anime
 *     summary: Аніме, випущені за останні пів року
 *     description: Отримати список аніме, які були випущені протягом останніх 180 днів.
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано список аніме, випущених за останній місяць.
 */
router.get('/released', animeController.getReleasedHalfYear)

/**
 * @openapi
 * /api/anime/season:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати декілька аніме сезону
 *     description: Отримуєм список аніме сезону, де рейтинг більше за 7.5
 *     responses:
 *       200:
 *         description: Успішна відповідь .Отримано список аніме сезону.
 */
router.get('/season', animeController.getSeason)

/**
 * @openapi
 * /api/anime/random:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати випадкове аніме
 *     description: Повертає випадкове аніме з бази даних.
 *     responses:
 *       200:
 *         description: Успішна відповідь. Повернуто випадкове аніме.
 */
router.get('/random', animeController.getRandom)

/**
 * @openapi
 * /api/anime/{id}:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати аніме за id
 *     description: Отримуємо аніме за id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID аніме
 *     responses:
 *       200:
 *         description: Успішна відповідь .Отримано аніме.
 */
router.get('/:id', animeController.getAnimeById)

module.exports = router
