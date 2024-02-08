import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Loader, Skeleton } from "../../../shared";


interface MaterialData {
	description: string;
	poster_url: string;
	genres: Array<string>;
}

interface Anime {
	id: string;
	title: string;
	material_data: MaterialData;
	year: number;
}

interface AnimeCardProps {
	animes: Anime[];
	loading: boolean;
}

export const AnimeCard: FC<AnimeCardProps> = ({ animes, loading }) => {
	const [isCardLoading, setIsCardLoading] = useState<boolean>(false);
	const [imagesLoaded, setImagesLoaded] = useState<Array<boolean>>(new Array(animes.length).fill(false));

	useEffect(() => {
		const loadImages = async () => {
			for (let i = 0; i < animes.length; i++) {
				const image = new Image();
				image.src = animes[i].material_data.poster_url || "";
				await new Promise((resolve) => {
					image.onload = resolve;
				});
				setImagesLoaded((prevLoaded) => {
					const newLoaded = [...prevLoaded];
					newLoaded[i] = true;
					return newLoaded;
				});
			}
		};
		loadImages();
	}, [imagesLoaded]);

	// if (loading) {
	// 	return <Loader />;
	// }

	return (
		<>
			{animes.map((anime: Anime, index: number) => {
				const updatedTitle = anime.title.includes("ТВ") ? anime.title.replace("ТВ-", "Сезон ") : anime.title;
				const genresString = anime.material_data.genres ? anime.material_data.genres.join(", ") : "";

				return (
					<div key={anime.id} className={styles.animeCard}>
						{imagesLoaded[index] ? (
							<Skeleton />
						) : (
							<img className={styles.image} src={anime.material_data.poster_url} alt={anime.title} />
						)
						}
						<div className={styles.content}>
							<h3>{updatedTitle}</h3>
							<p className={styles.anime__genres}>{genresString}</p>
							<p className={styles.anime__description}>{anime.material_data.description}</p>
							<span>{anime.year}</span>
						</div>
					</div>
				);
			})}
		</>
	);


};