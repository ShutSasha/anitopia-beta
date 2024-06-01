const UserModel = require('../models/User')
const banModel = require('../models/Ban')
const BanService = require('../services/BanService')

class banControllers {

   async add(req, res, next) {
      try {
         const { id } = req.params
         console.log(id)
         const { is_permanent, reason, timestamp_from, timestamp_to } = req.body

         const result = await BanService.addUserBan(id, is_permanent, reason, timestamp_from, timestamp_to)

         return res.status(201).json(result)
      } catch (e) {
         next(e)
      }
   }

   async delete(req, res, next) {
      try {
         const { id } = req.params
         const result = await BanService.deleteUserBan(id)
         return res.status(201).json(result)
      } catch (e) {
         next(e)
      }
   }

   async getBans(req, res, next) {
      try {
         const { id } = req.params
         const userBans = await BanService.getUserBans(id)
         return res.status(200).json(userBans)

      } catch (e) {
         next(e)
      }
   }




}

module.exports = new banControllers()