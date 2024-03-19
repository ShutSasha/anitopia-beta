const User = require('../models/User')
const userService = require('../services/UserService')

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
}

module.exports = new userController()
