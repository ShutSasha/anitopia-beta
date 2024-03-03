const ApiError = require("../errors/apiError");
const axios = require("axios");
const anime_serials = require("../animeFilterData.json");
class randomAnimeController {
	async getRandomAnime(req, res, next) {
		try {

			const data = anime_serials;

			const randomIndex = Math.floor(Math.random() * data.length);

			const randomAnime = data[randomIndex];

			return res.json(randomAnime);
		} catch (e) {
			console.error(e);
			next(e);
		}
	}
}

module.exports = new randomAnimeController();
