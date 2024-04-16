const { check } = require('express-validator')

const validateUserPersonalData = () => {
   return [
      check('firstName', `Ім'я користувача не може бути пустим`).optional().isString(),
      check('lastName', `Прізвище користувача не може бути пустим`).optional().isString(),
      check('country', `Країна користувача не може бути пустим`).optional().isString(),
      check('sex', `Стать користувача не може бути пустою`).optional(),
      check('age', `Вік користувача не може бути пустим`)
         .optional()
         .isInt({ min: 0, max: 99 })
         .withMessage('Вік користувача повинен бути від 0 до 99 років'),
   ]
}

module.exports = { validateUserPersonalData }
