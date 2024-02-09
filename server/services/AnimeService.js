class AnimeService {
	async getAnimeSubset(data, startIndex, count) {

		const resultData = data.slice(Number(startIndex), Number(startIndex) + Number(count));
		console.log(resultData);
		return resultData
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
