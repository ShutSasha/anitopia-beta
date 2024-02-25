const Router = require('express')
const router = new Router()
const rateAnimeController = require('../controllers/rateAnimeController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:id', authMiddleware, rateAnimeController.getRatedAnime)
router.post('/', authMiddleware, rateAnimeController.makeRateAnime)

module.exports = router
