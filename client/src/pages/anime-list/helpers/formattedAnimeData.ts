export const formattedAnimeData = (response: any) => {
	return response.data.map((anime: any) => ({
		title: anime.title,
		id: anime.id,
		material_data: {
			description: anime.material_data.description
				? anime.material_data.description
				: "Нет",
			poster_url: anime.material_data.poster_url,
			genres: anime.material_data.anime_genres,
		},
		year: anime.year,
	}));
};
