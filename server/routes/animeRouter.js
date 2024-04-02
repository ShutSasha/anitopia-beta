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
 * /api/anime/list-anime:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати список аніме
 *     description: Отримати список аніме 10 штук (для пагінації)
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано список аніме.
 */
router.get('/list-anime', animeController.getAnimeList)

/**
 * @openapi
 * /api/anime/top-anime:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати топ аніме
 *     description: Отримуєм список топ-100 аніме.
 *     responses:
 *       200:
 *         description: Успішна відповідь.Отримано топ аніме.
 */
router.get('/top-anime', animeController.getTopAnime)

/**
 * @openapi
 * /api/anime/updated:
 *  get:
 *     tags:
 *       - anime
 *     summary: Оновлені аніме
 *     description: Отримати список аніме, де випущений епізод на цьому тижні.
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано оновлений список аніме.
 */
router.get('/updated', animeController.updatedAnime)

/**
 * @openapi
 * /api/anime/releasedLastMonth:
 *  get:
 *     tags:
 *       - anime
 *     summary: Аніме, випущені за останній місяць
 *     description: Отримати список аніме, які були випущені протягом останніх 30 днів.
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано список аніме, випущених за останній місяць.
 */
router.get('/releasedLastMonth', animeController.releasedAnimeLastMonth)

/**
 * @openapi
 * /api/anime/season-anime:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати декілька аніме сезону
 *     description: Отримуєм список аніме сезону, де рейтинг більше за 7.5
 *     responses:
 *       200:
 *         description: Успішна відповідь .Отримано список аніме сезону.
 */
router.get('/season-anime', animeController.getAnimeSeason)

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
router.get('/:id', animeController.getAnime)

/**
 * @openapi
 * /api/anime/search/{title}:
 *  get:
 *     tags:
 *       - anime
 *     summary: Отримати аніме за title
 *     description: Отримуємо аніме за title
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: title аніме
 *     responses:
 *       200:
 *         description: Успішна відповідь .Отримано аніме.
 */
router.get('/search/:title', animeController.searchAnime)

module.exports = router
