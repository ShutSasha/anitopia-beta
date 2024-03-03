import { makeAutoObservable } from "mobx";
import { Rating } from "../../../pages/random-anime/ui/random-anime";
import { IAnime } from "../../models/IAnime";

export default class RandomAnime {
	animeRandomData = {} as IAnime;
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
