import { FC } from "react";
import styles from "./styles.module.scss";


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
	anime: Anime;

}

export const AnimeCard: FC<AnimeCardProps> = ({ anime}) => {
	const genreList = anime.material_data.genres.join(", ");
	const updatedTitle = anime.title.includes("ТВ") ? anime.title.replace("ТВ-", "Сезон ") : anime.title;


	return (
		<>
			<div className={styles.animeCard} >
				<img className={styles.image} src={anime.material_data.poster_url} alt={anime.title}/>
				<div className={styles.content}>
					<h3>{updatedTitle}</h3>
					<p className={styles.anime__genres}>{genreList}</p>
					<p className={styles.anime__description}>{anime.material_data.description}</p>
					<span>{anime.year}</span>
				</div>
			</div>
		</>
	);
};
