import { makeAutoObservable } from "mobx";
import { objDefaultState } from "../../../pages/random-anime/helpers/objectsFetchAnime";
import { Rating } from "../../../pages/random-anime/ui/random-anime";

export default class RandomAnime {
	animeRandomData = objDefaultState;
	ratingForRandomAnime = [] as Rating[];

	constructor() {
		makeAutoObservable(this);
		this.setRandomAnime = this.setRandomAnime.bind(this);
		this.setRatingForRandomAnime = this.setRatingForRandomAnime.bind(this);
	}

	setRandomAnime(animeData: any) {
		this.animeRandomData = animeData;
	}

	setRatingForRandomAnime(ratingData: any) {
		this.ratingForRandomAnime = ratingData;
	}

	randomAnimeClick(fucntionClick: () => void) {
		fucntionClick();
	}
}
