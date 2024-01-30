const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
	"/registration",
	[
		check("username", "Имя пользователя не может быть пустым").notEmpty(),
		check(
			"password",
			"Пароль должен быть больше 8 и меньше 20 символов"
		).isLength({ min: 8, max: 20 }),
		check("email","Неправильный формат электронной почты").isEmail()
	],
	authController.registration
);
router.post("/login", authController.login);
router.get("/users", roleMiddleware(['ADMIN']),authController.getUsers);
router.post("/logout", authController.logout);
router.get("/activate/:link", authController.activate);
router.get("/refresh", authController.refresh);

module.exports = router;
