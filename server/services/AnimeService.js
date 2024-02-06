
class AnimeService {

	async getRandomAnime(data){
		const animeData = [];
		for (let i = 0; i<10;i++){
			const randomIndex = Math.floor(Math.random() * data.length);
			animeData.push(data[randomIndex]);
		}
		return animeData;
	}
}

module.exports = new AnimeService()