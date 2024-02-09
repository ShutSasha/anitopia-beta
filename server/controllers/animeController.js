const animeSerials = require("../anime-serial.json");
const AnimeService = require("../services/AnimeService");
const { format } = require("date-fns");
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

	async getAnimeSeason(req, res, next) {
		try {
			// const date = new Date();
			//const formattedDate = format(date, "yyyy-MM-dd");

			const animeData = animeSerials;
			const sliceData = animeData.slice(0, 100);
			const filterData = await AnimeService.removeDuplicates(
				sliceData,
				"title"
			);

			const animeWithDate = filterData.filter(
				(item) => item.material_data.premiere_world != undefined
			);

			const seasonAnime = animeWithDate.filter((item) => {
				const premiereYear = Number(
					item.material_data.premiere_world.split("-")[0]
				);
				return premiereYear === 2023;
			});

			return res.json(seasonAnime);
		} catch (error) {}
	}

	async getAnime(req, res, next) {
		try {
			const { id } = req.params;
			const animeData = animeSerials;
			const anime = animeData.find((item) => item.id === id);
			console.log(id);
			return res.json(anime);
		} catch (error) {}
	}
}

module.exports = new AnimeController();
