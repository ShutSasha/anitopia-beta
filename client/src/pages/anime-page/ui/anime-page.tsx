import { FC, useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { Loader } from "../../../shared";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import { AnimeGeneralInfo } from "../../../widgets/anime_general_info";
import { PlayerBlock } from "../../../widgets/Player-block/ui/player-block";
import { AnimeScreenshots } from "../../../entities/ui/anime-screenshots/anime-screenshots";
import { IAnime } from "../../../app/models/IAnime";

export interface Rating {
	rating: number;
	logo: string;
	height: string;
	width: string;
}

export const AnimePage: FC = observer(() => {
	const { store } = useContext(Context);
	const [anime, setAnime] = useState<IAnime>();
	const [ratings, setRatings] = useState<Rating[]>();
	console.log(store.isLoading);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnime(store.anime.animeData);
			setRatings(store.anime.ratingForAnime);
			store.setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	if (store.isLoading || !anime) {
		return <Loader />;
	}

	return (
		<>
			<Header />
			{anime && (
				<div className={styles.wrapper}>
					<div className={styles.container}>
						{anime.link && (
							<>
								<AnimeGeneralInfo anime={anime} ratings={ratings} />
								<div className={styles.player_container}>
									<PlayerBlock link={anime.link} />
								</div>
								{anime.screenshots && (
									<AnimeScreenshots screenshots={anime.screenshots} />
								)}
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
});
