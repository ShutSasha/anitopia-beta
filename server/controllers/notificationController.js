const User = require('../models/User')
const Notification = require('../models/Notification')

class notificationController {
   async getNotifications(req, res, next) {
      try {
         const { user_id } = req.params

         const user = await User.findById(user_id).populate('notifications')

         if (!user) {
            return res.status(404).json({ message: 'User not found' })
         }

         res.json(user.notifications)
      } catch (error) {
         next(error)
      }
   }

   async getNotificationById(req, res, next) {
      try {
         const { id } = req.params

         const notification = await Notification.findById(id)

         if (!notification) {
            return res.status(404).json({ message: 'Notification not found' })
         }

         res.json(notification)
      } catch (e) {
         next(e)
      }
   }

   async makeNotification(req, res, next) {
      try {
         const { user_id, title, description, poster_url } = req.body

         const user = await User.findById(user_id)

         if (!user) {
            return res.status(404).json({ message: 'User not found' })
         }

         const notification = new Notification({ user: user_id, title, description, poster_url })

         await notification.save()

         user.notifications.push(notification._id)

         await user.save()

         res.status(201).json(notification)
      } catch (e) {
         next(e)
      }
   }

   async removeNotificationsByUser(req, res, next) {
      try {
         const { user_id } = req.params

         const user = await User.findById(user_id)

         if (!user) {
            return res.status(404).json({ message: 'User not found' })
         }

         user.notifications = []

         await user.save()

         await Notification.deleteMany({ user: user_id })

         res.json({ message: 'success' })
      } catch (error) {
         next(error)
      }
   }

   async removeNotificationById(req, res, next) {
      try {
         const { id } = req.params

         const notification = await Notification.findById(id)

         if (!notification) {
            return res.status(404).json({ message: 'Notification not found' })
         }

         const user = await User.findById(notification.user)

         user.notifications = user.notifications.filter((item) => item.toString() !== id)

         await user.save()

         await Notification.deleteOne({ _id: id })

         res.json({ message: 'success' })
      } catch (error) {
         next(error)
      }
   }
}

module.exports = new notificationController()
