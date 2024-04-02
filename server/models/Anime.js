const { Schema, model } = require('mongoose')

const AnimeSchema = new Schema(
   {
      comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
   },
   { strict: false },
)

module.exports = model('Anime', AnimeSchema)
