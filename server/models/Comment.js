const { Schema, model } = require('mongoose')

const CommentSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   anime: { type: Schema.Types.ObjectId, ref: 'Anime', required: true },
   comment_text: { type: String, required: true },
   likes: { type: Number, default: 0 },
   dislikes: { type: Number, default: 0 },
   likesBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   dislikesBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   timestamp: { type: Date, default: Date.now },
})

module.exports = model('Comment', CommentSchema)
