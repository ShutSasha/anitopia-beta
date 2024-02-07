import { FC } from "react";
import styles from "./styles.module.scss";
import { Skeleton } from "../../../shared";


interface MaterialData {
	description: string;
	poster_url: string;
	genres: Array<string>;
}

interface Anime {
	title: string;
	material_data: MaterialData;
	year: number;
}

interface AnimeCardProps {
	animes: Anime[];
	loading: boolean;
}

export const AnimeCard: FC<AnimeCardProps> = ({ animes, loading }) => {


	if (loading) {
		return <h1>ЗАГРУЗКА</h1>
	}

	return (
		<>
				{animes.map((anime: Anime,index:number) => {
					const updatedTitle = anime.title.includes("ТВ") ? anime.title.replace("ТВ-", "Сезон ") : anime.title;
					const genreList = anime.material_data.genres.join(", ");
					return (
						<div key={index} className={styles.animeCard}>
							<img className={styles.image} src={anime.material_data.poster_url} alt={anime.title} />
							<div className={styles.content}>
								<h3>{updatedTitle}</h3>
								<p className={styles.anime__genres}>{genreList}</p>
								<p className={styles.anime__description}>{anime.material_data.description}</p>
								<span>{anime.year}</span>
							</div>
						</div>
					);
				})}
		</>
	);


};