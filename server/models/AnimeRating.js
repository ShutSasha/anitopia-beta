const { Schema, model } = require('mongoose')

const AnimeRating = new Schema({
   animeId: { type: Schema.Types.ObjectId, ref: 'Anime' },
   rating: { type: Number, required: true },
})

module.exports = model('AnimeRating', AnimeRating)
