
class AnimeService {

	async  getAnimeSubset(data, startIndex, count) {
		console.log(data.slice(startIndex, startIndex + count));
		return data.slice(startIndex, startIndex + count);
	}
}

module.exports = new AnimeService()