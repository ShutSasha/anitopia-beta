import axios from "axios";
import { API_URL_RANDOM_ANIME } from "./random-anime-api";
import {
	arraySetRatings,
	objSetAnimeState,
} from "../helpers/objectsFetchAnime";

export const fetchAnimeData = async (
	setAnime: any,
	setRatings: any,
	setLoading: (item: boolean) => void,
	id: string | null
) => {
	setLoading(true);
	try {
		const res = await axios.get(API_URL_RANDOM_ANIME);
		console.log(res.data);

		setAnime(objSetAnimeState(res));
		setRatings(arraySetRatings(res));

		if (id) {
			const res = await axios.get(`http://localhost:5000/api/anime/anime/${id}`);

			setAnime(objSetAnimeState(res));
			setRatings(arraySetRatings(res));
		}
	} catch (error) {
		console.error(error);
	} finally {
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}
};

export const handleClickRandomAnime = (
	setAnime: React.Dispatch<React.SetStateAction<any>>,
	setRatings: React.Dispatch<React.SetStateAction<any>>,
	setLoading: (loading: boolean) => void,
	id: string | null
) => {
	fetchAnimeData(setAnime, setRatings, setLoading, id);
};
