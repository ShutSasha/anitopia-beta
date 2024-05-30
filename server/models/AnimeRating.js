const { Schema, model } = require('mongoose')

const AnimeRating = new Schema({
   rating: { type: Number, required: true },
   animeId: { type: String, required: true },
   poster_url: { type: String, required: true },
   title: { type: String, required: true },
   shikimori_id: { type: String, required: false }
})

module.exports = model('AnimeRating', AnimeRating)
