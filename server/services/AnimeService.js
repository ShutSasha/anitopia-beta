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
		const finalArray = await array.filter((_, index) => filterArray[index]);

		return finalArray;
	}

	sortByRating(data){

		data.sort((a,b) =>{
			if(a.material_data.shikimori_rating && b.material_data.shikimori_rating){
				return a.material_data.shikimori_rating - b.material_data.shikimori_rating;
			}
		});
		return dataList
	}
}

module.exports = new AnimeService();
