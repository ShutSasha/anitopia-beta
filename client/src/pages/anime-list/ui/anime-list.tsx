import { FC, useContext, useState } from "react";
import { Header } from "../../../widgets/header";
import { Context } from "../../../main.tsx";
import { DefaultButton, Loader} from "../../../shared";
import styles from "./styles.module.scss";
import axios from "axios";
import { AnimeCard } from "../../../entities";

interface MaterialData {
	description: string;
	poster_url: string;
	genres: Array<string>
}

interface Anime {
	title: string;
	material_data: MaterialData;
	year: number;
}

export const AnimeList: FC = () => {
	const { store } = useContext(Context);
	const [animeData, setAnimeData] = useState<Anime[]>([]);
	const [loading, setLoading] = useState<boolean>(false)

	const handleClick = () => {
		axios.get("http://localhost:5000/api/anime-list")
			.then(res => {
				setLoading(true)
				const formattedAnimeData = res.data.map(anime => ({
					title: anime.title,
					material_data:{
						description: anime.material_data.description,
						poster_url: anime.material_data.poster_url,
						genres: anime.material_data.anime_genres
					},
					year: anime.year
				}));
				setAnimeData(formattedAnimeData)
				setLoading(false)
				console.log(res.data);
			}).catch(e => {
			console.error(e);
		});
	};

	if (store.isLoading) {
		<Loader />;
	}

	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<DefaultButton text={"Получить лист аниме"} onClick={() => handleClick()} />
					<h1 className={styles.title}>Список Аниме</h1>
					<ul>
						{animeData.map((anime, index) => (
							<AnimeCard anime={anime} key={index} />
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
