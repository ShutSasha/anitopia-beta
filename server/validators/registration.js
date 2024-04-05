const { check } = require('express-validator')

const validateRegistration = () => {
   return [
      check('username', `Ім'я користувача не може бути пустим`).notEmpty(),
      check('password', 'Пароль повинен бути більше 8 і менше 20 символів').isLength({ min: 8, max: 20 }),
      check('email', 'Неправильний формат електронної пошти').isEmail(),
   ]
}

module.exports = { validateRegistration }
