const animeSerials = require("../anime-serial.json");
const AnimeService = require("../services/AnimeService");

class AnimeController {

	async getAnimeList(req, res, next) {

		try {
			const data = animeSerials;
			const result = await AnimeService.getRandomAnime(animeSerials);

			return res.json(result);
		} catch (e) {
			next(e);
		}
	}

}

module.exports = new AnimeController();