const { check } = require("express-validator");

const validateRegistration = () => {
	return [
		check("username", "Имя пользователя не может быть пустым").notEmpty(),
		check(
			"password",
			"Пароль должен быть больше 8 и меньше 20 символов"
		).isLength({ min: 8, max: 20 }),
		check("email", "Неправильный формат электронной почты").isEmail(),
	];
};

module.exports = { validateRegistration };
