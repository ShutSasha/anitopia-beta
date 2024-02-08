export interface IAnime {
	link: string;
	posterURL: string;
	title: string;
	screenshots: string[];
	type: string;
	status: string;
	airedEpisodes: number | null;
	totalEpisodes: number | null;
	minimalAge: number | null;
	description: string;
	genres: string[];
	year: number;
}
