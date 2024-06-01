const ApiError = require('../errors/apiError')
const tokenService = require('../services/TokenService')
const UserModel = require('../models/User')

module.exports = async function(req, res, next) {
   if (req.method === 'OPTIONS') {
      return next()
   }

   try {
      const token = req.headers.authorization.split(' ')[1]
      let user = null

      if (token !== 'null') {
         const userData = tokenService.validateAccessToken(token)
         if (userData) {
            user = await UserModel.findById(userData.id).populate('bans')
            if (!user) {
               console.error('User not found with token data')
               return next(ApiError.UnauthorizedError('Користувача не знайдено'))
            }
         }
      } else {
         const { username } = req.body
         console.log(`USERNAME: ${username}`)
         if (!username) {
            return next(ApiError.BadRequest('Необхідно вказати ім`я користувача або email'))
         }

         user = await UserModel.findOne({ username }).populate('bans')
         if (!user) {
            return next(ApiError.BadRequest('Користувача не знайдено'))
         }
      }

      const currentDate = Date.now()
      for (let ban of user.bans) {
         if (currentDate >= new Date(ban.timestamp_from) && currentDate <= new Date(ban.timestamp_to)) {
            res.clearCookie('refreshToken')
            return next(ApiError.Forbidden(`Користувач має поточне блокування, срок зняття: ${ban.timestamp_to}`))
         }
      }

      req.user = user
      next()
   } catch
      (e) {
      return next(ApiError.UnauthorizedError('Користувач не авторизований (an error occurred)'))
   }
}
