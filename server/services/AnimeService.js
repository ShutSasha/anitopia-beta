const { logger } = require("sequelize/lib/utils/logger");

class AnimeService {
	async getAnimeSubset(data, startIndex, count) {

		const resultData = data.slice(Number(startIndex), Number(startIndex) + Number(count));
		console.log(resultData);
		return resultData;
	}

	removeDuplicates(array, key) {
		const uniqueAnime = new Set();
		return array.filter((obj) => {
			if (!uniqueAnime.has(obj[key])) {
				uniqueAnime.add(obj[key]);
				return true;
			}
			return false;
		});
	}

	sortByRating(data) {
		data.sort((a, b) => {
			const ratingA = a?.material_data?.shikimori_rating ?? 0;
			const ratingB = b?.material_data?.shikimori_rating ?? 0;

			return ratingB - ratingA;
		});

		return data;
	}

	findAnime(data, searchText) {
		const lowerCaseSearchText = searchText.toLowerCase();
		const searchedData = data.filter(anime => {
			return anime?.title.toLowerCase().includes(lowerCaseSearchText);
		})
		return searchedData;
	}

}

module.exports = new AnimeService();
