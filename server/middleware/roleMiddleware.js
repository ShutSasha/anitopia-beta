const jwt = require('jsonwebtoken')
const ApiError = require('../errors/apiError')

module.exports = function (roles) {
   return function (req, res, next) {
      if (req.method === 'OPTIONS') {
         next()
      }

      try {
         const token = req.headers.authorization.split(' ')[1]

         if (!token) {
            return next(ApiError.UnauthorizedError('Користувач не авторизований (lose token)'))
         }
         const { roles: userRoles } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

         let hasRole = false

         userRoles.forEach((role) => {
            if (roles.includes(role)) {
               hasRole = true
            }
         })

         if (!hasRole) {
            return next(ApiError.Forbidden('У користувача недостатньо прав'))
         }
         next()
      } catch (e) {
         console.log(e)
         return next(ApiError.UnauthorizedError('Користувач не авторизований'))
      }
   }
}
