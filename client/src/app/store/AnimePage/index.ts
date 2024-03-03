import { makeAutoObservable } from "mobx";
import { Rating } from "../../../pages/random-anime/ui/random-anime";
import { IAnime } from "../../models/IAnime";

export default class AnimePage {
	animeData = {} as IAnime;
	ratingForAnime = [] as Rating[];

	constructor() {
		makeAutoObservable(this);
		this.setAnime = this.setAnime.bind(this);
		this.setRatingsAnime = this.setRatingsAnime.bind(this);
	}

	setAnime(animeData: any) {
		this.animeData = animeData;
	}

	setRatingsAnime(ratingData: any) {
		this.ratingForAnime = ratingData;
	}
}
