const { Schema, model } = require('mongoose')

const ComplaintSchema = new Schema({
   fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   category: { type: String, required: true },
   timestamp: { type: Date, default: Date.now },
})

model.exports = model('Complaint', ComplaintSchema)