const { Schema, model } = require('mongoose')

const News = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   title: { type: String, required: true },
   type: { type: String, required: true },
   images: [{ type: String }],
   description: { type: String },
   timestamp: { type: Date, default: Date.now },
})

module.exports = model('News', News)