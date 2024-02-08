class AnimeService {
	async getAnimeSubset(data, startIndex, count) {
		// console.log(
		// 	data.slice(Number(startIndex), Number(startIndex) + Number(count))
		// 		.length
		// );
		return data.slice(Number(startIndex), Number(startIndex) + Number(count));
	}
}

module.exports = new AnimeService();
