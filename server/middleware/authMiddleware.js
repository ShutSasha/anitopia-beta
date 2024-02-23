const jwt = require('jsonwebtoken')
const ApiError = require('../errors/apiError')
const tokenService = require('../services/TokenService')
module.exports = function (req, res, next) {
   if (req.method === 'OPTIONS') {
      next()
   }

   try {
      const authorizationHeader = req.headers.authorization
      console.log(req)
      if (!authorizationHeader) {
         return next(
            ApiError.UnauthorizedError('Пользователь не авторизирован1'),
         )
      }

      const accessToken = authorizationHeader.split(' ')[1]
      if (!accessToken) {
         return next(
            ApiError.UnauthorizedError('Пользователь не авторизирован2'),
         )
      }

      const userData = tokenService.validateAccessToken(accessToken)

      if (!userData) {
         return next(
            ApiError.UnauthorizedError('Пользователь не авторизирован3'),
         )
      }

      req.user = userData
      next()
   } catch (e) {
      return next(ApiError.UnauthorizedError('Пользователь не авторизирован4'))
   }
}
