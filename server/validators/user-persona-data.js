const { check } = require('express-validator')

const validateUserPersonalData = () => {
   return [
      check('firstName', `Ім'я користувача не може бути пустим`).optional().isString(),
      check('lastName', `Прізвище користувача не може бути пустим`).optional().isString(),
      check('country', `Країна користувача не може бути пустим`).optional().isString(),
      check('sex', `Стать користувача не може бути пустою`).optional(),
      check('age', `Вік користувача не може бути пустим`)
         .optional()
         .custom((value, { req }) => {
            if (!Number.isNaN(Number(value))) {
               const age = parseInt(value)
               if (age < 0 || age > 99) {
                  throw new Error('Вік користувача повинен бути від 0 до 99 років')
               }
               return true
            } else {
               throw new Error('Вік користувача повинен бути числом')
            }
         }),
   ]
}

module.exports = { validateUserPersonalData }
