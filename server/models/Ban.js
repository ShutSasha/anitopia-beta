const { Schema, model } = require('mongoose')

const Ban = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   is_permanent: { type: Boolean, required: true },
   reason: { type: String, required: true },
   timestamp_from: {type:Date,default: Date.now},
   timestamp_to: { type: Date, required: true},
})

module.exports = model('Ban', Ban)