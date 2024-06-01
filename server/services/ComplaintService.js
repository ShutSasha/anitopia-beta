const UserModel = require('../models/User')
const ComplaintModel = require('../models/Complaint')

class ComplaintService {

   async addUserComplaint(from_user, to_user, category) {
      const user = await UserModel.findById(to_user)
      if (!from_user || !to_user || !category) {
         throw new Error('Користувач не знайден')
      }

      const complaint = new ComplaintModel({ from_user, to_user, category })

      await complaint.save()

      user.complaints.push(complaint._id)

      await user.save()
   }

   async getUserComplaints(id) {
      const user = await UserModel.findById(id).populate('complaints')
      if (!user) {
         throw new Error('Користувач не знайден')
      }

      return user.complaints
   }

}

module.exports = new ComplaintService()