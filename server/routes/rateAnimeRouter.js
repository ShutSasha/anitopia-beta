const Router = require('express')
const router = new Router()
const rateAnimeController = require('../controllers/rateAnimeController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:id', rateAnimeController.getRatedAnime)
router.post('/', authMiddleware, rateAnimeController.makeRateAnime)
router.delete('/', authMiddleware, rateAnimeController.removeAnimeRate)

module.exports = router
