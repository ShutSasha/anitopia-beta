const { Schema, model } = require('mongoose')

const Anime = new Schema({
   anime_id: { type: String, required: true },
   title: { type: String, required: true },
   rating: { type: Number, required: true },
})

module.exports = model('Anime', Anime)
