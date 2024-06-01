const UserModel = require('../models/User')
const banModel = require('../models/Ban')

class BanService {

   async addUserBan(id, is_permanent, reason, timestamp_from, timestamp_to) {
      const user = await UserModel.findById(id).populate('bans')
      if (!user) {
         throw new Error('Користувача не знайдено')
      }

      const currentDate = Date.now()

      for (let ban of user.bans) {
         if (currentDate >= new Date(ban.timestamp_from) && currentDate <= new Date(ban.timestamp_to)) {
            throw new Error('Користувач вже має поточне блокування')
         }
      }

      const userBan = new banModel({
         user: id,
         is_permanent,
         reason,
         timestamp_from,
         timestamp_to,
      })

      await userBan.save()

      user.bans.push(userBan._id)

      await user.save()
   }


   async deleteUserBan(id) {
      try {
         const user = await UserModel.findById(id).populate('bans')
         if (!user) {
            throw new Error('Користувача не знайдено')
         }

         const currentDate = new Date()
         const bansToDelete = user.bans.filter(ban => currentDate >= new Date(ban.timestamp_from) && currentDate <= new Date(ban.timestamp_to))

         user.bans = user.bans.filter(ban => !(currentDate >= new Date(ban.timestamp_from) && currentDate <= new Date(ban.timestamp_to)))
         await user.save()

         const banIdsToDelete = bansToDelete.map(ban => ban._id)
         await banModel.deleteMany({ _id: { $in: banIdsToDelete } })

         return user
      } catch (error) {

         throw error
      }
   }

   async getUserBans(id) {
      const user = await UserModel.findById(id).populate('bans')
      return user.bans
   }

}

module.exports = new BanService()