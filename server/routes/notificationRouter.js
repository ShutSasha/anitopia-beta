const Router = require('express')
const router = new Router()
const notificationController = require('../controllers/notificationController')

router.get('/user/:user_id', notificationController.getNotifications)
router.delete('/user/:user_id', notificationController.removeNotificationsByUser)
router.get('/:id', notificationController.getNotificationById)
router.delete('/:id', notificationController.removeNotificationById)
router.post('/', notificationController.makeNotification)

module.exports = router
