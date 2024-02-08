export const translateStatus = (statusAnime: string) => {
	const statuses: { [key: string]: string } = {
		released: "Вышел",
		ongoing: "Онгоинг",
	};

	return statuses[statusAnime] || statusAnime;
};

export const AiredEpisodesValidation = (
	lastEpisode: number,
	episodesAired: number,
	totalEpisodes: number,
	statusAnime: string
): number => {
	return statusAnime === "released"
		? totalEpisodes
		: episodesAired > lastEpisode
		? episodesAired
		: lastEpisode;
};
