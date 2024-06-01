const { Schema, model } = require('mongoose')

const Complaint = new Schema({
   from_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   to_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   category: { type: String, required: true },
   timestamp: { type: Date, default: Date.now },
})

module.exports = model('Complaint', Complaint)