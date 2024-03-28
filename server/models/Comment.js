const { Schema, model } = require('mongoose')

const CommentSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   anime: { type: Schema.Types.ObjectId, ref: 'Anime', required: true },
   comment_text: { type: String, required: true },
   timestamp: { type: Date, default: Date.now },
})

module.exports = model('Comment', CommentSchema)
