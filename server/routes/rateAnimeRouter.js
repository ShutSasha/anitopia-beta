const Router = require('express')
const router = new Router()
const rateAnimeController = require('../controllers/rateAnimeController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, rateAnimeController.makeRateAnime)

module.exports = router
