const animeSerials = require("../anime-serial.json");
const AnimeService = require("../services/AnimeService");

class AnimeController {
	async getAnimeList(req, res, next) {
		try {
			const data = animeSerials;
			const startIndex = req.query.page * req.query.limit || 0;
			const count = req.query.limit || 10;
			const result = await AnimeService.getAnimeSubset(
				data,
				startIndex,
				count
			);
			return res.json(result);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new AnimeController();
