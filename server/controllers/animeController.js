const animeSerials = require("../anime-serial.json");
const AnimeService = require("../services/AnimeService");

class AnimeController {
	// constructor() {
	// 	this.getAnimeList = this.getAnimeList.bind(this);
	// }
	//
	// removeDuplicatesByTitle(animeArray) {
	// 	return animeArray.filter((anime, index, self) =>
	// 		index === self.findIndex((t) => t.title === anime.title)
	// 	);
	// }
	async getAnimeList(req, res, next) {
		try {
			const data = animeSerials;
			const startIndex = req.query.page * req.query.limit || 0;
			console.log(startIndex)
			const count = req.query.limit || 10;
			console.log(count);
			const result = await AnimeService.getAnimeSubset(data, startIndex, count);
			return res.json(result);
		} catch (e) {
			next(e);
		}
	}

}

module.exports = new AnimeController();