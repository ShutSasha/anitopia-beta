const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)

module.exports = router
