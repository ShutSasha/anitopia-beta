const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const complaintController = require('../controllers/complaintController')

router.post('/',authMiddleware,complaintController.addComplaint)
router.get('/:id',authMiddleware, complaintController.getComplaints)

module.exports = router