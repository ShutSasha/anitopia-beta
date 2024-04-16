const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const roleMiddleware = require('../middleware/roleMiddleware')
const { validateRegistration } = require('../validators/registration')

router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)
router.get('/refresh', authController.refresh)
router.post('/registration', validateRegistration(), authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/check-user', authController.checkUser)
router.put('/rechange', authController.generateTempPassword)
router.get('/activate/:link', authController.activate)

module.exports = router
