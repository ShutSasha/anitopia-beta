const userService = require('../services/UserService')
const roleService = require('../services/RoleService')
const paymentService = require('../services/PaymentService')
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
         const { isControlPanel } = req.query
         const users = await userService.getAllUsers(isControlPanel)
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

         const { firstName, lastName, country, sex, age, about } = req.body

         const updatedUserData = await userService.editPersonalData(id, {
            firstName,
            lastName,
            country,
            sex,
            age,
            about,
         })
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

   async BuySubscribe(req, res, next) {
      try {
         const params = {
            version: 3,
            action: 'pay',
            amount: 1,
            currency: 'UAH',
            description: 'Anitopia subcribe',
            order_id: 'order12345',
         }
         const result = await paymentService.generateHtmlForm(params)
         return res.json(result)
      } catch (e) {
         next(e)
      }
   }

   async addUserRole(req, res, next) {
      try {
         const { id } = req.params
         const { role } = req.body
         const result = await roleService.add(id, role)
         return res.status(200).json(result)
      } catch (e) {
         next(e)
      }
   }

   async getUserRole(req, res, next) {
      try {
         const { id } = req.params
         const userRoles = await roleService.getUserRoles(id)
         return res.status(200).json(userRoles)
      } catch (e) {
         next(e)
      }
   }

   async deleteUserRole(req, res, next) {
      try {
         const { id } = req.params
         const { role } = req.body
         const result = await roleService.deleteUserRole(id, role)
         return res.status(200).json(result)
      } catch (e) {
         next(e)
      }
   }

   async banUser(req, res, next) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Помилка при валідації', errors.array()))
         }
         return res.status(200)
      } catch (e) {
         next(e)
      }
   }

   async getSiteBackground(req, res, next) {
      try {
         const { id } = req.params

         const user = await userService.getUserById(id)

         return res.status(200).json({ siteBackgroundColor: user.siteBackgroundColor })
      } catch (e) {
         next(e)
      }
   }

   async changeSiteBackground(req, res, next) {
      try {
         const { id } = req.params
         const { color } = req.body

         const user = await userService.getUserById(id)

         user.siteBackgroundColor = color

         user.markModified('siteBackgroundColor')

         await user.save()

         return res.status(200).json({ siteBackgroundColor: user.siteBackgroundColor })
      } catch (e) {
         next(e)
      }
   }

   async searchUser(req, res, next) {
      try {
         const { query } = req.query

         const users = await userService.searchUsers(query)

         return res.status(200).json(users)
      } catch (e) {
         next(e)
      }
   }
}

module.exports = new userController()
