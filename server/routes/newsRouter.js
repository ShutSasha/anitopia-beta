const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')

router.post('/', newsController.add)
router.get('/', newsController.getNews)
router.get('/:id', newsController.getNewsById)
router.delete('/:id', newsController.delete)

module.exports = router
