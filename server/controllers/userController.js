const userService = require('../services/UserService')
const { validationResult } = require('express-validator')
const ApiError = require('../errors/apiError')

class userController {
   async getUserById(req, res, next) {
      const { id } = req.params
      try {
         const user = await userService.getUserById(id)
         return res.json(user)
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

   async editPersonalData(req, res, next) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Помилка при валідації', errors.array()))
         }

         const { id } = req.params

         const { firstName, lastName, country, sex, age } = req.body

         const updatedUserData = await userService.editPersonalData(id, { firstName, lastName, country, sex, age })
         return res.status(201).json(updatedUserData)
      } catch (e) {
         next(e)
      }
   }

   async uploadAvatar(req, res, next) {
      try {
         const { id } = req.params
         const uploadedFile = req.file.path
         const result = await userService.changeUserIcon(uploadedFile, id)
         return res.status(200).json(result)
      } catch (e) {
         next(e)
      }
   }

   async uploadBackground(req, res, next) {
      try {
         console.log('uploadBackground')
      } catch (e) {
         next(e)
      }
   }

   async uploadStatus(req, res, next) {
      try {
         const { username } = req.params
         const userStatus = await userService.getStatus(username)
         return res.json({ status: userStatus })
      } catch (e) {
         next(e)
      }
   }

   async changePassword(req, res, next) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Помилка при валідації', errors.array()))
         }

         const { id } = req.params
         const { oldPassword, newPassword } = req.body
         const result = await userService.changePassword(id, oldPassword, newPassword)

         return res.status(200).json(result)
      } catch (e) {
         next(e)
      }
   }
}

module.exports = new userController()
