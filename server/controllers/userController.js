const User = require('../models/User')
const userService = require('../services/UserService')

class userController {
   async getById(req, res, next) {
      const { id } = req.params
      try {
         const user = await userService.getUserById(id)
         return res.json(user)
      } catch (e) {
         next(e)
      }
   }

   async getAll(req, res, next) {
      try {
         const users = await userService.getAllUsers()
         return res.json(users)
      } catch (e) {
         next(e)
      }
   }

   async editPersonalData(req, res, next) {
      try {
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
         const { username } = req.body
         const uploadedFile = req.file.path
         const result = await userService.changeUserIcon(uploadedFile, username)
         return res.status(200).json(result)
      } catch (e) {
         next(e)
      }
   }

   async uploadBackground(req, res, next) {
      try {
         const { username } = req.body
         const uploadedFile = req.file.path
         const result = await userService.changeUserIcon(uploadedFile, username)
         return res.status(200).json(result)
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
}

module.exports = new userController()
