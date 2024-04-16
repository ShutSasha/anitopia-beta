const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const animeRouter = require('./animeRouter')
const rateAnimeRouter = require('./rateAnimeRouter')
const commentRouter = require('./commentRouter')
const userRouter = require('./userRouter')

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/anime', animeRouter)
router.use('/rate-anime', rateAnimeRouter)
router.use('/comments', commentRouter)

module.exports = router
