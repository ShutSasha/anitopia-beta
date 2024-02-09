class AnimeService {
	async getAnimeSubset(data, startIndex, count) {
		return data.slice(Number(startIndex), Number(startIndex) + Number(count));
	}

	async removeDuplicates(array, key) {
		const filterArray = await Promise.all(
			array.map(async (obj, index, self) => {
				return index === self.findIndex((t) => t[key] === obj[key]);
			})
		);

		const finalArray = array.filter((_, index) => filterArray[index]);

		return finalArray;
	}
}

module.exports = new AnimeService();
