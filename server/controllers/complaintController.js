const ComplaintModel = require('../models/Complaint')
const UserModel = require('../models/User')
const complaintService = require('../services/ComplaintService')

class complaintController {

   async addComplaint(req, res, next) {
      try {
         const { from_user, to_user, category } = req.body

         const addedComplaint = await complaintService.addUserComplaint(from_user,to_user,category)

         return res.status(201).json(addedComplaint)
      } catch (e) {
         next(e)
      }
   }

   async getComplaints(req, res, next) {
      try {
         const { id } = req.params
         const userComplaints = await complaintService.getUserComplaints(id)

         res.status(200).json(userComplaints)

      } catch (e) {
         next(e)
      }
   }

}

module.exports = new complaintController()