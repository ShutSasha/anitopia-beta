const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");

router.post(
	"/registration",
	[
		check("username", "Имя пользователя не может быть пустым").notEmpty(),
		check(
			"password",
			"Пароль должен быть больше 8 и меньше 20 символов"
		).isLength({ min: 8, max: 20 }),
	],
	authController.registration
);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);

module.exports = router;
