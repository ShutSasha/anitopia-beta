const { Schema, model } = require('mongoose')

const User = new Schema({
   username: { type: String, unique: true, required: true },
   email: { type: String, unique: true, required: true },
   password: { type: String, required: true },
   firstName: { type: String, required: false },
   lastName: { type: String, required: false },
   country: { type: String, required: false },
   age: { type: Number, required: false },
   sex: { type: String, required: false },
   about: { type: String, required: false },
   avatarLink: {
      type: String,
      required: false,
      default: 'https://ik.imagekit.io/duin0vggc/tr:h-200,w-200/user_icons/default-user-icon.jpg',
   },
   uploadStatus: { type: Boolean, required: false },
   registrationDate: { type: Date, required: true },
   activationLink: { type: String },
   isActivated: { type: Boolean, default: false },
   roles: [{ type: String, ref: 'Role' }], //TODO Исправить хранение роли
   notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
   bans: [{ type: Schema.Types.ObjectId, ref: 'Ban' }],
   complaints: [{ type: Schema.Types.ObjectId, ref: 'Complaint' }],
   animeRatings: [Schema.Types.Mixed],
   siteBackgroundColor: { type: String, default: '#e2e2e2' },
})

module.exports = model('User', User)
