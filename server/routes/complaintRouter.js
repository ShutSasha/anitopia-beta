const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const complaintController = require('../controllers/complaintController')
const router = new Router()

router.get('/id',authMiddleware, complaintController.getUserComplaints)
router.post('/',authMiddleware,complaintController.addUserComplaint)

module.exports = router