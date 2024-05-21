const { check } = require('express-validator')

const validatePassword = () => {
   return [
      check('newPassword', 'Пароль повинен бути більше 8 і менше 20 символів').optional().isLength({ min: 8, max: 20 }),
   ]
}

module.exports = { validatePassword }
