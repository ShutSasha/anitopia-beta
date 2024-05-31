const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const multer = require('multer')
const { validateUserPersonalData } = require('../validators/user-persona-data')
const { validatePassword } = require('../validators/password')
const upload = multer({ dest: 'uploads/' })
const validateRole = require('../middleware/roleMiddleware')

/**
 * @openapi
 * tags:
 *   - name: users
 *     description: API для користувачів
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - users
 *     summary: Отримати всіх користувачів
 *     description: Отримати список всіх користувачів системи.
 *     responses:
 *       200:
 *         description: Успішний запит. Список всіх користувачів отримано.
 *       500:
 *         description: Помилка сервера. Не вдалося отримати список користувачів.
 */
router.get('/', userController.getUsers)

/**
 * @openapi
 * /api/users/upload-status/{username}:
 *   get:
 *     tags:
 *       - users
 *     summary: Отримати статус завантаження для користувача
 *     description: Отримати статус завантаження для користувача за його ім'ям користувача.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Ім'я користувача
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успішний запит. Статус завантаження отримано.
 *       500:
 *         description: Помилка сервера. Не вдалося отримати статус завантаження.
 */
router.get('/upload-status/:username', userController.uploadStatus)

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Отримати користувача за ідентифікатором
 *     description: Отримати користувача системи за його ідентифікатором.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ідентифікатор користувача
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успішний запит. Користувача отримано.
 *       500:
 *         description: Помилка сервера. Не вдалося отримати користувача.
 */
router.get('/:id', userController.getUserById)

/**
 * @openapi
 * /api/users/{id}/personal-data:
 *   put:
 *     tags:
 *       - users
 *     summary: Редагувати особисті дані користувача
 *     description: Редагувати особисті дані користувача за його ідентифікатором.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ідентифікатор користувача
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Нові дані користувача
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               country:
 *                 type: string
 *               sex:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: Успішний запит. Особисті дані користувача оновлено.
 *       500:
 *         description: Помилка сервера. Не вдалося оновити особисті дані користувача.
 */
router.put('/:id/personal-data', validateUserPersonalData(), userController.editPersonalData)

/**
 * @openapi
 * /api/users/{id}/avatar:
 *   post:
 *     tags:
 *       - users
 *     summary: Завантажити аватар користувача
 *     description: Завантажити аватар користувача за його ідентифікатором.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ідентифікатор користувача
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Зображення аватара
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Успішний запит. Аватар користувача завантажено.
 *       500:
 *         description: Помилка сервера. Не вдалося завантажити аватар користувача.
 */
router.post('/:id/avatar', upload.single('img'), userController.uploadAvatar)

/**
 * @openapi
 * /api/users/{id}/background:
 *   post:
 *     tags:
 *       - users
 *     summary: Завантажити фон користувача
 *     description: Завантажити фон користувача за його ідентифікатором.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ідентифікатор користувача
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Зображення фону
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Успішний запит. Фон користувача завантажено.
 *       500:
 *         description: Помилка сервера. Не вдалося завантажити фон користувача.
 */
router.post('/:id/background', userController.uploadBackground)

router.put('/:id/password', validatePassword(), userController.changePassword)

router.post('/:id/subscribe', userController.BuySubscribe)

router.get('/roles/:id',validateRole(['ADMIN']),userController.getUserRole)

router.post('/roles/:id', validateRole(['ADMIN']), userController.addUserRole)

router.delete('/roles/:id',validateRole(['ADMIN']),userController.deleteUserRole)



router.put('/:id/block', validateRole(['MODERATOR', 'ADMIN']), userController.banUser)


module.exports = router
