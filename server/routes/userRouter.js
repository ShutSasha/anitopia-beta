const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', userController.getAll)
router.get('/upload-status/:username', userController.uploadStatus)
router.get('/:id', userController.getById)
router.put('/:id/personal-data', userController.editPersonalData)
router.post('/:id/avatar', upload.single('img'), userController.uploadAvatar)
router.post('/:id/background', userController.uploadBackground)

module.exports = router
