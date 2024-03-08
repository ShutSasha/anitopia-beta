const { Schema, model } = require('mongoose')

const AnimeSchema = new Schema({
   id: { type: String, required: true, unique: true },
   type: { type: String, required: true },
   link: { type: String },
   title: { type: String, required: true },
   year: { type: Number, required: true },
   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
   dynamic_data: { type: Schema.Types.Mixed },
})

module.exports = model('Anime', AnimeSchema)
