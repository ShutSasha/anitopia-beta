export const formattedAnimeData = (response: any) => {
	try {
		return response.data.map((anime: any) => ({
			title: anime.title,
			id: anime.id,
			material_data: {
				description: anime.material_data.description
					? anime.material_data.description
					: "Нет",
				poster_url: anime.material_data.poster_url,
				genres: anime.material_data.anime_genres,
				rating: anime.material_data.shikimori_rating
			},
			year: anime.year
		}));
	} catch (e) {
		console.error("An error occured to get anime list");
	}
};
