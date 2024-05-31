const ComplaintModel = require('../models/Complaint')
const UserModel = require('../models/User')

class complaintController {

   async addUserComplaint(req, res, next) {
      try {
         const { from_user, to_user, category } = req.body

         const user = await UserModel.findById(to_user)
         if (!from_user || !to_user || !category) {
            return res.status(400)
         }

         const complaint = new ComplaintModel({ from_user, to_user, category })

         await complaint.save()

         user.complaints.push(complaint._id)

         await user.save()

         return res.status(201).json(complaint)
      } catch (e) {
         next(e)
      }
   }


   //TODO error
   async getUserComplaints(req, res, next) {
      try {
         const { id } = req.params
         console.log(id)
         const user = await UserModel.findById(id).populate('complaints')
         if (!user) {
            return res.status(404).json({ message: 'User not found' })
         }
         res.json(user.complaints)

      } catch (e) {
         next(e)
      }

   }

}

module.exports = new complaintController()