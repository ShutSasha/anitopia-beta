const { Schema, model } = require('mongoose')

const AnimeRating = new Schema({
   rating: { type: Number, required: true },
   animeId: { type: String, required: true },
})

module.exports = model('AnimeRating', AnimeRating)
