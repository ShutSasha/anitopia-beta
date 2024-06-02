const ApiError = require('../errors/apiError')
const tokenService = require('../services/TokenService')
const UserModel = require('../models/User')

module.exports = async function(req, res, next) {
   if (req.method === 'OPTIONS') {
      return next()
   }

   try {
      const { refreshToken } = req.cookies
      let user = null
      console.log(refreshToken)

      if (req.method === 'GET' && refreshToken) {
         if (refreshToken) {
            const userData = tokenService.validateRefreshToken(refreshToken)
            if (userData) {
               user = await UserModel.findById(userData.id).populate('bans')

               if (!user) {
                  return next(ApiError.UnauthorizedError('Користувача не знайдено'))
               }
            } else {
               return next(ApiError.UnauthorizedError('Невалідний токен'))
            }
         } else {
            return next(ApiError.UnauthorizedError('Токен не надано'))
         }
      } else if (req.method === 'POST') {
         const { username } = req.body

         if (!username) {
            return next(ApiError.BadRequest('Необхідно вказати ім`я користувача або email'))
         }

         user = await UserModel.findOne({ username }).populate('bans')
         if (!user) {
            return next(ApiError.BadRequest('Користувача не знайдено'))
         }
      }

      if (user) {
         const currentDate = Date.now()
         for (let ban of user.bans) {
            if (currentDate >= new Date(ban.timestamp_from) && currentDate <= new Date(ban.timestamp_to)) {
               return next(ApiError.Forbidden(`Користувач має поточне блокування. Час блокування ${ban.timestamp_to}`))
            }
         }
         req.user = user
      }
      next()
   } catch (e) {
      console.error('Помилка при валідації користувача: ', e)
      return next(ApiError.UnauthorizedError('Користувач не авторизований (an error occurred)'))
   }
}
