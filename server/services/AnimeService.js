class AnimeService {
	async getAnimeSubset(data, startIndex, count) {

		const resultData = data.slice(Number(startIndex), Number(startIndex) + Number(count));
		console.log(resultData);
		return resultData
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


	sortByRating(data){
		data.sort((a,b) =>{
			if(a.material_data.shikimori_rating && b.material_data.shikimori_rating){
				return a.material_data.shikimori_rating - b.material_data.shikimori_rating;
			}
		});
		return data
	}


}

module.exports = new AnimeService();
