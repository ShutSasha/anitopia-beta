const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const roleMiddleware = require('../middleware/roleMiddleware')
const { validateRegistration } = require('../validators/registration')
const banMiddleware= require('../middleware/banMiddleware')
/**
 * @openapi
 * tags:
 *   - name: auth
 *     description: API для аунтефікації
 */

/**
 * @openapi
 * /api/auth/users:
 *   get:
 *     tags:
 *       - auth
 *     summary: Отримати список користувачів (особо не нада)
 *     responses:
 *       200:
 *         description: Успішна відповідь. Отримано список користувачів.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 60d0fe4f5311236168a109ca
 *                   username:
 *                     type: string
 *                     example: johndoe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   country:
 *                     type: string
 *                     example: USA
 *                   age:
 *                     type: integer
 *                     example: 30
 *                   sex:
 *                     type: string
 *                     example: male
 *                   avatarLink:
 *                     type: string
 *                     example: https://ik.imagekit.io/duin0vggc/tr:h-200,w-200/user_icons/default-user-icon.jpg
 *                   uploadStatus:
 *                     type: boolean
 *                     example: true
 *                   registrationDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2021-06-23T18:25:43.511Z
 *                   isActivated:
 *                     type: boolean
 *                     example: true
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["USER"]
 *       401:
 *         description: Неавторизований доступ.
 *       403:
 *         description: Доступ заборонений.
 *       500:
 *         description: Внутрішня помилка сервера.
 */
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)

/**
 * @openapi
 * /api/auth/refresh:
 *   get:
 *     tags:
 *       - auth
 *     summary: Оновити токен авторизації
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Токен оновлення для аутентифікації
 *     responses:
 *       200:
 *         description: Успішна відповідь. Токен авторизації оновлено.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                 refreshToken:
 *                   type: string
 *                   example: dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     country:
 *                       type: string
 *                       example: USA
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     sex:
 *                       type: string
 *                       example: male
 *                     avatarLink:
 *                       type: string
 *                       example: https://ik.imagekit.io/duin0vggc/tr:h-200,w-200/user_icons/default-user-icon.jpg
 *                     registrationDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2021-06-23T18:25:43.511Z
 *                     isActivated:
 *                       type: boolean
 *                       example: true
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["USER"]
 *       401:
 *         description: Користувач не авторизований.
 *       403:
 *         description: Доступ заборонений.
 *       500:
 *         description: Внутрішня помилка сервера.
 */
router.get('/refresh',banMiddleware, authController.refresh)

/**
 * @openapi
 * /api/auth/registration:
 *   post:
 *     tags:
 *       - auth
 *     summary: Реєстрація нового користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: mysecretpassword
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               pictureLink:
 *                 type: string
 *                 example: https://example.com/picture.jpg
 *     responses:
 *       200:
 *         description: Успішна відповідь. Користувач зареєстрований.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                 refreshToken:
 *                   type: string
 *                   example: dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     country:
 *                       type: string
 *                       example: USA
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     sex:
 *                       type: string
 *                       example: male
 *                     avatarLink:
 *                       type: string
 *                       example: https://example.com/picture.jpg
 *                     registrationDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2021-06-23T18:25:43.511Z
 *                     isActivated:
 *                       type: boolean
 *                       example: true
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["USER"]
 *       400:
 *         description: Помилка при валідації введених даних.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Помилка при валідації
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *       500:
 *         description: Внутрішня помилка сервера.
 */
router.post('/registration', validateRegistration(), authController.registration)

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Логін користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: mysecretpassword
 *     responses:
 *       200:
 *         description: Успішна відповідь. Користувач залогінений.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                 refreshToken:
 *                   type: string
 *                   example: dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     country:
 *                       type: string
 *                       example: USA
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     sex:
 *                       type: string
 *                       example: male
 *                     avatarLink:
 *                       type: string
 *                       example: https://example.com/picture.jpg
 *                     registrationDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2021-06-23T18:25:43.511Z
 *                     isActivated:
 *                       type: boolean
 *                       example: true
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["USER"]
 *       400:
 *         description: Помилка при валідації введених даних.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Неправильне ім'я користувача або пароль.
 *       403:
 *         description: Акаунт не активований.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: У вас не активований аккаунт!
 *       500:
 *         description: Внутрішня помилка сервера.
 */
router.post('/login', banMiddleware, authController.login)

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - auth
 *     summary: Вихід користувача з системи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Рефреш токен користувача
 *                 example: dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4
 *     responses:
 *       200:
 *         description: Успішна відповідь. Користувача вилоговано.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   example: true
 *                 deletedCount:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Помилка при валідації запиту.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Не вказано рефреш токен.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

router.post('/logout', authController.logout)

/**
 * @openapi
 * /api/auth/check-user:
 *   post:
 *     tags:
 *       - auth
 *     summary: Перевірка наявності користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Ім'я користувача для перевірки
 *                 example: johndoe
 *     responses:
 *       200:
 *         description: Успішна відповідь. Користувач знайдений.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d0fe4f5311236168a109ca
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 country:
 *                   type: string
 *                   example: USA
 *                 age:
 *                   type: integer
 *                   example: 30
 *                 sex:
 *                   type: string
 *                   example: male
 *                 avatarLink:
 *                   type: string
 *                   example: https://example.com/picture.jpg
 *                 registrationDate:
 *                   type: string
 *                   format: date-time
 *                   example: 2021-06-23T18:25:43.511Z
 *                 isActivated:
 *                   type: boolean
 *                   example: true
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["USER"]
 *       404:
 *         description: Користувач не знайдений.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Користувача з ім'ям johndoe не знайдено.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

router.post('/check-user', authController.checkUser)

/**
 * @openapi
 * /api/auth/rechange:
 *   put:
 *     tags:
 *       - auth
 *     summary: Зміна тимчасового пароля користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Електронна адреса користувача
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Успішна відповідь. Тимчасний пароль змінено.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d0fe4f5311236168a109ca
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 country:
 *                   type: string
 *                   example: USA
 *                 age:
 *                   type: integer
 *                   example: 30
 *                 sex:
 *                   type: string
 *                   example: male
 *                 avatarLink:
 *                   type: string
 *                   example: https://example.com/picture.jpg
 *                 registrationDate:
 *                   type: string
 *                   format: date-time
 *                   example: 2021-06-23T18:25:43.511Z
 *                 isActivated:
 *                   type: boolean
 *                   example: true
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["USER"]
 *       400:
 *         description: Помилка при виконанні операції.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Не вказано електронну адресу користувача.
 *       404:
 *         description: Користувача з вказаною електронною адресою не знайдено.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Користувача з електронною адресою johndoe@example.com не знайдено.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

router.put('/rechange', authController.generateTempPassword)

/**
 * @openapi
 * /api/auth/activate/{link}:
 *   get:
 *     tags:
 *       - auth
 *     summary: Активація облікового запису
 *     parameters:
 *       - in: path
 *         name: link
 *         required: true
 *         schema:
 *           type: string
 *         description: Посилання активації
 *     responses:
 *       302:
 *         description: Успішна активація. Користувач буде перенаправлений на вказану сторінку.
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               example: https://example.com/login
 *       400:
 *         description: Помилка при виконанні операції.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Неправильне посилання активації.
 *       500:
 *         description: Внутрішня помилка сервера.
 */

router.get('/activate/:link', authController.activate)

module.exports = router
