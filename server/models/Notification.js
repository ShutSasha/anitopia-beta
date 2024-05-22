const { Schema, model } = require('mongoose')

const Notification = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   title: { type: String, required: true },
   description: { type: String, required: true },
   poster_url: { type: String, required: false },
   timestamp: { type: Date, default: Date.now },
})

module.exports = model('Notification', Notification)
