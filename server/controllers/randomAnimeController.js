const ApiError = require("../errors/apiError");
const axios = require("axios");

class randomAnimeController {
	async getRandomAnime(req, res, next) {
		try {
			const response = await axios.get(
				`https://kodikapi.com/list?token=${process.env.KODIK_TOKEN}&types=anime-serial`
			);
			const data = response.data;

			const { results } = data;

			const randomIndex = Math.floor(Math.random() * results.length);

			const randomAnime = results[randomIndex];

			return res.json(randomAnime);
		} catch (e) {
			console.error(e);
			next(e);
		}
	}
}

module.exports = new randomAnimeController();
