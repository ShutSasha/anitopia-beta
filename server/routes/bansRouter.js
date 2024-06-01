const Router = require('express')
const router = new Router()
const banController = require('../controllers/banControlles')

router.post('/:id', banController.add)

router.delete('/:id', banController.delete)

router.get('/:id', banController.getBans)

module.exports = router