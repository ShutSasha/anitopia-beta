const { Schema, model } = require('mongoose')

const QueryAnime = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   title_ukr: { type: String, required: true },
   title_end: { type: String, required: true },
   aired_year: { type: Date, required: true },
   studio: { type: String, required: true },
   age_restriction: { type: String, required: true },
   type: { type: String, required: true },
   genres: [{ type: String, required: true }],
   status: { type: String, required: true },
})

module.exports = model('QueryAnime', QueryAnime)