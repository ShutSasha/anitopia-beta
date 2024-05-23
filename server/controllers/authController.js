const User = require('../models/User')
const { validationResult } = require('express-validator')
const userService = require('../services/UserService')
const ApiError = require('../errors/apiError')

class authController {
   async registration(req, res, next) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Помилка при валідації', errors.array()))
         }

         const { username, password, email, pictureLink } = req.body
         const userData = await userService.registration(username, email, password, pictureLink)
         res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         })

         return res.json(userData)
      } catch (e) {
         next(e)
      }
   }

   async login(req, res, next) {
      try {
         const { username, password } = req.body
         const userData = await userService.login(username, password)

         res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         })

         return res.json(userData)
      } catch (e) {
         next(e)
      }
   }

   async logout(req, res, next) {
      try {
         const { refreshToken } = req.cookies
         const token = await userService.logout(refreshToken)
         res.clearCookie('refreshToken')
         return res.json(token)
      } catch (e) {
         next(e)
      }
   }

   async getUsers(req, res, next) {
      try {
         const users = await userService.getAllUsers()
         return res.json(users)
      } catch (e) {
         next(e)
      }
   }

   async refresh(req, res, next) {
      try {
         const { refreshToken } = req.cookies
         const userData = await userService.refresh(refreshToken)
         res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         })

         return res.json(userData)
      } catch (e) {
         next(e)
      }
   }

   async activate(req, res, next) {
      try {
         const activationLink = req.params.link

         await userService.activation(activationLink)
         return res.redirect(process.env.CLIENT_URL)
      } catch (e) {
         next(e)
      }
   }

   async checkUser(req, res, next) {
      try {
         const { username } = req.body
         let user = await User.findOne({ username })
         return res.json(user)
      } catch (e) {
         next(e)
      }
   }

   async generateTempPassword(req, res, next) {
      try {
         const { email } = req.body

         const user = await User.findOne({ email })
         await userService.generatePassword(user)
         return res.json(user)
      } catch (e) {
         next(e)
      }
   }
}

module.exports = new authController()
