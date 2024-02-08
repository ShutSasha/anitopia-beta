
class AnimeService {

	async  getAnimeSubset(data, startIndex, count) {
		return data.slice(startIndex, startIndex + count);
	}
}

module.exports = new AnimeService()