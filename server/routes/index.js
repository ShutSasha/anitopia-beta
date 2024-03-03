const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const profileRouter = require('./profileRouter')
const randomAnimeRouter = require('./randomAnimeRouter')
const animeRouter = require('./animeRouter')
const rateAnimeRouter = require('./rateAnimeRouter')

router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/random-anime', randomAnimeRouter)
router.use('/anime', animeRouter)
router.use('/rate-anime', rateAnimeRouter)

module.exports = router
